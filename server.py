# server.py
# Server Lokal Dual-Stack (IPv4 & IPv6) Cepat & Tanpa Delay untuk Ekosistem Sekolah
import http.server
import socketserver
import threading
import socket
import sys

# Memastikan output Windows tidak error karena karakter khusus
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8080

class FastHandler(http.server.SimpleHTTPRequestHandler):
    def address_string(self):
        # Mencegah reverse DNS lookup (penyebab utama localhost loading lama 10-30 detik di Windows)
        return self.client_address[0]

socketserver.TCPServer.allow_reuse_address = True

class V6Server(socketserver.TCPServer):
    address_family = socket.AF_INET6

def run_ipv4():
    try:
        with socketserver.TCPServer(('0.0.0.0', PORT), FastHandler) as httpd:
            print(f"[OK] [IPv4] Server aktif di: http://127.0.0.1:{PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"[WARN] [IPv4] Gagal mengaktifkan: {e}")

def run_ipv6():
    try:
        with V6Server(('::', PORT), FastHandler) as httpd:
            print(f"[OK] [IPv6] Server aktif di: http://localhost:{PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"[WARN] [IPv6] Gagal mengaktifkan (mungkin sudah ditangani IPv4 dual-stack): {e}")

if __name__ == '__main__':
    print("==================================================")
    print(" >>> AKTIFASI SERVER LOKAL EKOSISTEM SEKOLAH <<<")
    print("==================================================")
    
    # Jalankan IPv4 di thread terpisah
    t4 = threading.Thread(target=run_ipv4, daemon=True)
    t4.start()
    
    # Jalankan IPv6 di thread utama (mendukung localhost ::1 Windows)
    run_ipv6()
