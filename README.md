# WH Stockout Apps - Glassmorphism Edition

Aplikasi Warehouse Management System untuk operasi stock out di Denso Indonesia dengan desain glassmorphism modern menggunakan Expo.

## 🚀 Fitur Utama

### ✅ Fitur yang Telah Diimplementasi
- **Login/Register System** - Autentikasi pengguna dengan validasi
- **Home Dashboard** - Dashboard utama dengan menu navigasi glassmorphism
- **Stock Out Part WH** - Scan kanban untuk stock out tanpa instruksi
- **Camera Scanner** - Scanner QR code/barcode dengan expo-camera
- **Data Management** - Penyimpanan lokal dengan AsyncStorage
- **Sound Effects** - Audio feedback untuk scan dan notifikasi
- **Glassmorphism UI** - Desain modern dengan efek transparan dan blur

### 🔧 Fitur dalam Pengembangan
- **Stock Out with Instruction** - Stock out dengan panduan detail
- **Shopping List Management** - Manajemen daftar belanja
- **Bluetooth Printer** - Integrasi printer Bluetooth
- **API Integration** - Koneksi ke backend server

## 📱 Screenshots

Aplikasi menggunakan desain glassmorphism dengan:
- Gradien warna modern (Slate Blue, Purple, Turquoise)
- Efek transparansi dan blur
- Animasi smooth dan responsive
- Sound feedback untuk interaksi

## 🛠 Teknologi

- **Framework**: Expo SDK 53
- **UI Library**: React Native dengan custom glassmorphism components
- **Navigation**: React Navigation v7
- **Storage**: AsyncStorage
- **Camera**: expo-camera & expo-barcode-scanner
- **Audio**: expo-av
- **Styling**: Custom glassmorphism style system

## 📦 Instalasi

### Prerequisites
- Node.js 18+
- Expo CLI
- Android Studio (untuk build Android)

### Setup Project
```bash
# Clone project
git clone <repository-url>
cd wh-stockout-glassmorphism

# Install dependencies
npm install

# Start development server
npx expo start
```

### Build APK
```bash
# Install EAS CLI
npm install -g @expo/cli eas-cli

# Build APK
npx eas build --platform android --profile preview
```

## 🎯 Cara Penggunaan

### Login
1. Masukkan NPK/Username dan Password
2. Klik Login untuk masuk ke aplikasi
3. Atau klik Register untuk membuat akun baru

### Stock Out Part WH
1. Pilih menu "Stock Out Part WH" dari dashboard
2. Klik "Scan by Camera" untuk memulai scanning
3. Arahkan kamera ke QR code kanban (format 30 karakter)
4. Data akan otomatis tersimpan dalam tabel
5. Klik "Selesai Belanja" untuk submit data

### Reset Data
1. Klik tombol "Reset" (warna merah)
2. Masukkan password: `0000`
3. Data akan terhapus dari storage lokal

## 🔧 Konfigurasi

### API Endpoints
File: `src/utils/api.js`
```javascript
export const apiBaseURL = 'http://10.122.73.131:8700/wh-stockout';
```

### Glassmorphism Theme
File: `src/styles/glassmorphism.js`
- Primary colors: Slate Blue gradients
- Secondary colors: Purple gradients  
- Accent colors: Turquoise & Hot Pink
- Transparency: 20-30% opacity
- Blur effects: Built-in blur components

## 📁 Struktur Project

```
wh-stockout-glassmorphism/
├── src/
│   ├── components/          # Reusable components
│   ├── screens/            # Screen components
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── StockoutScreen.js
│   │   ├── WOInstructionScreen.js
│   │   └── FullCameraScanScreen.js
│   ├── navigation/         # Navigation setup
│   ├── styles/            # Glassmorphism styles
│   ├── utils/             # Utilities & API
│   └── assets/            # Images, sounds, animations
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── eas.json              # EAS build configuration
└── package.json          # Dependencies
```

## 🎨 Glassmorphism Design System

### Color Palette
```javascript
const colors = {
  primary: ['#6A5ACD', '#483D8B', '#8A2BE2'],
  secondary: ['#9370DB', '#8A2BE2', '#6A5ACD'],
  accent: ['#00CED1', '#FF69B4', '#9370DB'],
  neutral: ['#FFFFFF', '#F0F0F0', '#C0C0C0']
};
```

### Glass Components
- `glassCard`: Kartu transparan dengan blur effect
- `glassButton`: Tombol dengan glassmorphism style
- `glassInput`: Input field dengan efek kaca
- `iconContainer`: Container ikon dengan border glass

## 🔍 QR Code Format

Aplikasi mendukung QR code dengan format:
- **Length**: 30 karakter
- **Structure**: Part Number (15) + Quantity (6) + WH Code (1) + Unique (7)
- **Example**: `1234567890ABCDE000100A1234567`

## 🚨 Troubleshooting

### Common Issues

1. **Camera Permission Denied**
   - Pastikan permission camera diizinkan di device settings
   - Restart aplikasi setelah memberikan permission

2. **Sound Not Playing**
   - Pastikan volume device tidak dalam mode silent
   - Check file audio ada di folder `src/assets/sounds/`

3. **Build Errors**
   - Jalankan `npx expo install --fix` untuk fix dependency conflicts
   - Pastikan semua asset files tersedia (icon.png, splash.png)

### Development Tips

1. **Testing di Device**
   - Gunakan Expo Go untuk testing cepat
   - Untuk fitur camera, gunakan EAS Build

2. **Performance Optimization**
   - Gunakan `useFocusEffect` untuk lifecycle management
   - Implement lazy loading untuk komponen berat

## 📞 Support

Untuk bantuan teknis atau pertanyaan:
- Email: support@denso.com
- Internal: PED Team - Denso Indonesia

## 📄 License

© 2025 PED - Denso Indonesia. All rights reserved.

---

**Note**: Aplikasi ini dikembangkan khusus untuk operasi warehouse Denso Indonesia dengan standar keamanan dan kualitas tinggi.

