import json
import base64

path = r'C:\Users\ITAMI\.gemini\antigravity-ide\brain\3eecd661-9485-4a1e-bde1-0044a436dc7f\.system_generated\logs\transcript_full.jsonl'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

user_lines = [l for l in lines if '"source":"USER_EXPLICIT"' in l]
if user_lines:
    last_user = json.loads(user_lines[-1])
    contents = last_user.get('content', [])
    for item in contents:
        if isinstance(item, dict) and item.get('type') == 'image_url':
            url = item['image_url']['url']
            if url.startswith('data:image'):
                b64 = url.split(',')[1]
                with open(r'd:\BERKAS SDN PASIRMAE 1\FAIL GURU\MOHAMAD RIZKI\OTHERS\PROJECTS\Ekosistem Sekolah\assets\reezapps-7.png', 'wb') as img_f:
                    img_f.write(base64.b64decode(b64))
                print('Image saved successfully to assets/reezapps-7.png')
                break
    else:
        print('No base64 image found in the last user message.')
