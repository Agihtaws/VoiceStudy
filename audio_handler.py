import os
import tempfile
import time
import wave
import assemblyai as aai
import pyaudio
from config import ASSEMBLYAI_API_KEY

# Configure AssemblyAI
aai.settings.api_key = ASSEMBLYAI_API_KEY

class AudioHandler:
    def __init__(self):
        self.format = pyaudio.paInt16
        self.channels = 1
        self.rate = 16000
        self.chunk = 1024
        self.audio = pyaudio.PyAudio()
        
    def record_audio(self, duration=5):
        """Record audio for a specified duration"""
        stream = self.audio.open(format=self.format,
                            channels=self.channels,
                            rate=self.rate,
                            input=True,
                            frames_per_buffer=self.chunk)
        
        print("Recording...")
        frames = []
        
        for i in range(0, int(self.rate / self.chunk * duration)):
            data = stream.read(self.chunk)
            frames.append(data)
            
        print("Recording finished")
        
        stream.stop_stream()
        stream.close()
        
        # Save as temporary WAV file
        temp_file = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
        with wave.open(temp_file.name, 'wb') as wf:
            wf.setnchannels(self.channels)
            wf.setsampwidth(self.audio.get_sample_size(self.format))
            wf.setframerate(self.rate)
            wf.writeframes(b''.join(frames))
        
        return temp_file.name
    
    def transcribe_audio(self, audio_file):
        """Transcribe audio using AssemblyAI"""
        print("Transcribing audio...")
        
        # Using the file transcription API (not real-time streaming)
        # This works within free tier limitations
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(audio_file)
        
        # Clean up the temporary file
        os.unlink(audio_file)
        
        if transcript.status == "completed":
            return transcript.text
        else:
            return f"Transcription failed with status: {transcript.status}"
    
    def close(self):
        """Clean up resources"""
        self.audio.terminate()
