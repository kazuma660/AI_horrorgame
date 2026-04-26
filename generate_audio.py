import wave
import struct
import math
import random
import os

def generate_wav(filename, duration, sample_rate, generate_sample):
    path = os.path.join('public', filename)
    with wave.open(path, 'w') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sample_rate)
        
        for i in range(int(duration * sample_rate)):
            t = i / sample_rate
            sample = generate_sample(t, i)
            # Clip
            sample = max(-32768, min(32767, int(sample * 32767)))
            f.writeframes(struct.pack('h', sample))

# 1. Notification (Sine wave beep)
def notif_sample(t, i):
    if t > 0.5: return 0
    freq = 880 if (t % 0.2) < 0.1 else 0
    return math.sin(2 * math.pi * freq * t) * 0.3 * math.exp(-t * 2)

# 2. Doorknob (Metallic rattle, noise + mod)
def doorknob_sample(t, i):
    if t > 1.0: return 0
    noise = random.uniform(-1, 1)
    env = math.exp(-t * 5)
    rattle = math.sin(2 * math.pi * 15 * t)
    return noise * env * rattle * 0.5

# 3. Bang (Low freq burst)
def bang_sample(t, i):
    if t > 0.5: return 0
    noise = random.uniform(-1, 1)
    env = math.exp(-t * 10)
    low_freq = math.sin(2 * math.pi * 50 * t)
    return (noise * 0.5 + low_freq) * env * 0.8

# 4. Footstep (Muffled thump)
def footstep_sample(t, i):
    if t > 0.3: return 0
    env = math.exp(-t * 15)
    low_freq = math.sin(2 * math.pi * 30 * t)
    return low_freq * env * 0.6

# 5. Tension (Drone)
def tension_sample(t, i):
    freq1 = 50 + math.sin(2 * math.pi * 0.1 * t) * 5
    freq2 = 52 + math.sin(2 * math.pi * 0.15 * t) * 3
    s1 = math.sin(2 * math.pi * freq1 * t)
    s2 = math.sin(2 * math.pi * freq2 * t)
    return (s1 + s2) * 0.2

os.makedirs('public/se', exist_ok=True)
os.makedirs('public/bgm', exist_ok=True)

generate_wav('se/notification.wav', 1.0, 44100, notif_sample)
generate_wav('se/doorknob.wav', 1.5, 44100, doorknob_sample)
generate_wav('se/bang.wav', 0.8, 44100, bang_sample)
generate_wav('se/footstep.wav', 0.5, 44100, footstep_sample)
generate_wav('bgm/tension.wav', 10.0, 44100, tension_sample)
generate_wav('bgm/silence.wav', 1.0, 44100, lambda t,i: 0)

print("Audio generation complete.")
