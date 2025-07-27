import google.generativeai as genai
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from config import GEMINI_API_KEY, MISTRAL_API_KEY, AI_MODEL

class AIHandler:
    def __init__(self):
        self.model = AI_MODEL
        self.conversation_history = []
        
        if self.model == "gemini":
            genai.configure(api_key=GEMINI_API_KEY)
            self.gemini_model = genai.GenerativeModel('gemini-pro')
            self.gemini_chat = self.gemini_model.start_chat(history=[])
        elif self.model == "mistral":
            self.mistral_client = MistralClient(api_key=MISTRAL_API_KEY)
        else:
            raise ValueError(f"Unsupported AI model: {self.model}")
        
        # Initialize with system prompt for educational context
        self._add_system_message()
    
    def _add_system_message(self):
        system_prompt = """You are VoiceStudy, an educational AI tutor specializing in helping students learn.
        Focus on providing clear, concise explanations for academic subjects.
        Break down complex topics into understandable components.
        If asked about a topic you're unsure about, acknowledge limitations and suggest resources.
        Keep responses educational, accurate, and helpful for a student's learning journey.
        """
        
        if self.model == "gemini":
            self.gemini_chat.history.append({
                "role": "user", 
                "parts": ["Please act as an educational tutor with the following guidelines: " + system_prompt]
            })
            self.gemini_chat.history.append({
                "role": "model", 
                "parts": ["I'll serve as VoiceStudy, your educational AI tutor. I'll provide clear explanations, break down complex topics, and support your learning journey."]
            })
        else:
            # For Mistral, we'll add the system message directly in the chat method
            self.system_prompt = system_prompt
    
    def generate_response(self, user_query):
        """Generate AI response based on user query"""
        try:
            if self.model == "gemini":
                response = self.gemini_chat.send_message(user_query)
                response_text = response.text
                
            elif self.model == "mistral":
                # Create messages list with system prompt and user query
                messages = [
                    ChatMessage(role="system", content=self.system_prompt),
                    ChatMessage(role="user", content=user_query)
                ]
                
                # Get response from Mistral
                chat_response = self.mistral_client.chat(
                    model="mistral-medium",
                    messages=messages
                )
                
                response_text = chat_response.choices[0].message.content
                
            return response_text
        
        except Exception as e:
            return f"Error generating response: {str(e)}"
