import React, { useState, useEffect } from 'react';

import { Camera, Home, FileText, BookOpen, Gift, User, Wifi, WifiOff, Award, Target, AlertTriangle, MessageCircle, Play, Send, TrendingUp, Zap, Star, Medal, CheckCircle2, ShoppingBag, Pill, Heart, Baby, Calendar, Phone, MapPin } from 'lucide-react';

const NutriSnapApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isOnline, setIsOnline] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [userPoints, setUserPoints] = useState(1750);
  const [userLevel, setUserLevel] = useState('Perak');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Halo! Saya Asisten Gizi NutriSnap. Ada yang bisa saya bantu hari ini?', time: '10:00' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  // --- TAMBAHAN BARU ---
  const [userBirthDate, setUserBirthDate] = useState(''); 
  const [userAge, setUserAge] = useState(0); 
  const [dateInput, setDateInput] = useState('');

  
  // Fungsi Hitung Umur
  const calculateAge = (birthDateString) => {
    if (!birthDateString) return 0;
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  // ---------------------
 // --- STATE INPUT & DATA USER LENGKAP ---
  const [loginInput, setLoginInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');     // <-- INI YANG KURANG TADI
  const [addressInput, setAddressInput] = useState(''); // <-- INI YANG KURANG TADI
  
  const [userPhone, setUserPhone] = useState('');       // Simpan Data HP
  const [userAddress, setUserAddress] = useState('');   // Simpan Data Alamat
  const [userDatabase, setUserDatabase] = useState({});
  

  // Login Screen
  // Ubah dari 'const LoginScreen' menjadi 'const renderLoginScreen'
  const renderLoginScreen = () => {
    const handleLogin = () => {
      if (loginInput.trim() === '') {
        alert('Nama tidak boleh kosong!');
        return;
      }
      // Validasi Tanggal Lahir
      if (dateInput === '') {
        alert('Tanggal lahir tidak boleh kosong!');
        return;
      }

      const trimmedName = loginInput.trim();
      const calculatedAge = calculateAge(dateInput); // Hitung umur
      
      if (userDatabase[trimmedName]) {
        // User Lama
        setUserName(trimmedName);
        const savedDate = userDatabase[trimmedName].birthDate || dateInput;
        setUserBirthDate(savedDate);
        setUserAge(calculateAge(savedDate));
        setUserPoints(userDatabase[trimmedName].points);
        setUserLevel(userDatabase[trimmedName].level);
        setUserPhone(userData.phone || phoneInput);
        setUserAddress(userData.address || addressInput);
      } else {
        // User Baru
        setUserName(trimmedName);
        setUserBirthDate(dateInput);
        setUserAge(calculatedAge);
        setUserPoints(1750);
        setUserPhone(phoneInput);
        setUserAddress(addressInput);
        setUserLevel('Perak');
        setUserDatabase({
          ...userDatabase,
          [trimmedName]: {
            points: 1750,
            level: 'Perak',
            birthDate: dateInput, phone: phoneInput, address: addressInput
          }
        });
      }
      
      setCurrentScreen('home');
      setLoginInput('');
      setDateInput(''); 
      setPhoneInput(''); 
      setAddressInput('');
    };

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {/* Logo/Icon */}
          <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <Award className="w-20 h-20 text-blue-600" />
          </div>

          {/* App Name */}
          <h1 className="text-4xl font-bold text-white mb-2">NutriSnap</h1>
          <p className="text-white/90 text-center mb-12 px-4">
            Aplikasi Pemantauan Gizi untuk Ibu & Baduta
          </p>

          {/* Login Card */}
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col max-h-[50vh]">
            <div className="p-6 pb-2 text-center flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Selamat Datang!</h2>
              <p className="text-gray-600 text-center mb-6">Lengkapi data Anda untuk masuk</p>
            </div>

              <div className="overflow-y-auto px-6 pb-6 pt-2 space-y-3 custom-scrollbar"> 
                {/* Input Nama */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
                      placeholder="Contoh: Siti Aminah"
                      className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                  </div>
                </div>

              {/* INPUT TANGGAL LAHIR (BARU) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Lahir</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>
              {/* === INPUT BARU 1: NOMOR HP === */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor HP</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>

              {/* === INPUT BARU 2: ALAMAT === */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Domisili</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Contoh: Jl. Mawar No. 10"
                    className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>
              {/* ============================== */}

              <button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Masuk
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              Dengan masuk, Anda menyetujui syarat dan ketentuan NutriSnap
              <p className="text-xs text-gray-500 text-center mt-3"></p>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-white/70 text-sm">
          <p>© 2025 NutriSnap. All rights reserved.</p>
            <div className="p-5 text-center text-white/70 text-sm"></div>
        </div>
      </div>
    );
  };

  // Offline Modal
  const OfflineModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Anda Sedang Offline</h2>
          <p className="text-gray-600 text-base mb-6">Fitur chat memerlukan koneksi internet. Silakan aktifkan koneksi Anda terlebih dahulu.</p>
          
          <button 
            onClick={() => setShowOfflineModal(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );

  // Home Screen Component - Gaya Digital Wallet
  const HomeScreen = () => (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-600 to-blue-700">
      {/* Header dengan Saldo Poin */}
      <div className="p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm opacity-90">Selamat datang,</p>
            <h1 className="text-2xl font-bold">{userName}!</h1>
            {/* Tampilan Umur */}
            <div className="flex items-center gap-1 mt-1 bg-white/20 w-fit px-3 py-1 rounded-full">
               <User className="w-3 h-3 text-white" />
               <p className="text-xs font-semibold text-white">{userAge} Tahun</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowLevelModal(true)}
              className="bg-white/20 p-2 rounded-xl"
            >
              <Award className="w-6 h-6" />
            </button>
            <div className="bg-white/20 px-3 py-2 rounded-xl flex items-center gap-2">
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Kartu Saldo Poin - Gaya GoPay */}
        <div className="bg-white rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Poin NutriSnap</p>
              <h2 className="text-4xl font-bold text-blue-600">{userPoints}</h2>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <Medal className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">Level: {userLevel}</span>
            </div>
            <button 
              onClick={() => setShowLevelModal(true)}
              className="text-blue-600 font-semibold text-sm"
            >
              Lihat Progress →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions - Kembali ke 4 Grid Normal */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <QuickAction icon={<FileText className="w-6 h-6" />} label="Laporan" onClick={() => setCurrentScreen('analysis')} />
          <QuickAction icon={<BookOpen className="w-6 h-6" />} label="Edukasi" onClick={() => setCurrentScreen('education')} />
          <QuickAction icon={<Gift className="w-6 h-6" />} label="Tukar Poin" onClick={() => setCurrentScreen('rewards')} />
          <QuickAction 
            icon={<MessageCircle className="w-6 h-6" />} 
            label="Chat" 
            onClick={() => {
              if (isOnline) {
                setCurrentScreen('chat');
              } else {
                setShowOfflineModal(true); // Tampilkan popup jika offline
              }
            }} 
          />
        </div>
      </div>

      {/* Misi Harian Section */}
      <div className="flex-1 bg-white rounded-t-[40px] p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Misi Harian
          </h2>
          <span className="text-sm text-gray-500">2/3 Selesai</span>
        </div>
        
        <div className="space-y-3">
          <MissionCard 
            icon="🐟"
            title="Makan Ikan Lele Hari Ini" 
            points={50} 
            completed={true}
          />
          <MissionCard 
            icon="🥬"
            title="Konsumsi Sayur Hijau" 
            points={30} 
            completed={true}
          />
          <MissionCard 
            icon="🥚"
            title="Makan 2 Butir Telur" 
            points={40} 
            completed={false}
          />
          <MissionCard 
            icon="💧"
            title="Minum 8 Gelas Air" 
            points={20} 
            completed={false}
          />
        </div>

        {/* Banner Promo */}
        <div className="mt-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Bonus Poin Minggu Ini!</p>
              <h3 className="text-xl font-bold">Scan 5x = +100 Poin</h3>
            </div>
            <Zap className="w-12 h-12" />
          </div>
        </div>
      </div>

    </div>
  );

  // Quick Action Button
  const QuickAction = ({ icon, label, onClick }) => (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="text-blue-600">{icon}</div>
      <span className="text-xs font-semibold text-gray-700 text-center">{label}</span>
    </button>
  );

  // Mission Card Component
  const MissionCard = ({ icon, title, points, completed }) => (
    <div className={`border-2 rounded-2xl p-4 ${completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-4xl">{icon}</div>
          <div className="flex-1">
            <p className={`font-semibold text-base ${completed ? 'text-green-700' : 'text-gray-800'}`}>{title}</p>
            <p className="text-sm text-gray-600">+{points} Poin</p>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completed ? 'bg-green-500' : 'bg-gray-300'}`}>
          {completed && <CheckCircle2 className="w-5 h-5 text-white" />}
        </div>
      </div>
    </div>
  );

  // Level Modal
  const LevelModal = () => {
    const nextLevelPoints = 2500;
    const currentPoints = userPoints;
    const progress = (currentPoints / nextLevelPoints) * 100;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Progress Level Anda</h2>
          
          <div className="space-y-4 mb-6">
            <LevelBadge name="Perunggu" points="0-1000" active={false} completed={true} />
            <LevelBadge name="Perak" points="1000-2500" active={true} completed={false} />
            <LevelBadge name="Emas" points="2500+" active={false} completed={false} />
          </div>

          <div className="bg-gray-100 rounded-2xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Menuju Level Emas</span>
              <span className="text-sm font-bold text-blue-600">{currentPoints}/{nextLevelPoints}</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">
              Kurang {nextLevelPoints - currentPoints} poin lagi!
            </p>
          </div>

          <button 
            onClick={() => setShowLevelModal(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  };

  const LevelBadge = ({ name, points, active, completed }) => (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${active ? 'bg-blue-50 border-2 border-blue-400' : completed ? 'bg-green-50 border border-green-200' : 'bg-gray-100 border border-gray-200'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${active ? 'bg-blue-500' : completed ? 'bg-green-500' : 'bg-gray-300'}`}>
        <Medal className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1">
        <p className={`font-bold ${active ? 'text-blue-700' : completed ? 'text-green-700' : 'text-gray-500'}`}>{name}</p>
        <p className="text-xs text-gray-600">{points} poin</p>
      </div>
      {completed && <CheckCircle2 className="w-6 h-6 text-green-500" />}
      {active && <span className="text-blue-600 font-semibold text-sm">Aktif</span>}
    </div>
  );

  // Scan Result Screen
  const ScanScreen = () => {
    const [isScanning, setIsScanning] = useState(true);
    const [detectedFood, setDetectedFood] = useState(null);

    // Simulasi proses scanning
    useEffect(() => {
      if (isScanning) {
        const timer = setTimeout(() => {
          setIsScanning(false);
          setDetectedFood('Tempe Mentah');
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [isScanning]);

    return (
      <div className="h-full overflow-y-auto bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center gap-3">
          <button onClick={() => setCurrentScreen('home')} className="text-white">
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-bold">{isScanning ? 'Memindai...' : 'Hasil Pindai'}</h1>
        </div>

        {isScanning ? (
          // Camera Preview Area - Sedang Scanning
          <>
            <div className="relative bg-gray-900 h-96 flex items-center justify-center">
              <div className="absolute inset-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-20 h-20 mx-auto mb-3 opacity-50 animate-pulse" />
                    <p className="text-base">Arahkan kamera ke makanan mentah</p>
                  </div>
                </div>
                
                {/* Bounding Box Frame */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-400 w-64 h-64 rounded-2xl animate-pulse">
                  {/* Corner Markers */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
                </div>

                {/* Scan Tips */}
                <div className="absolute bottom-8 left-0 right-0 px-6">
                  <div className="bg-black/60 backdrop-blur rounded-2xl p-4 text-white text-center">
                    <p className="text-sm">💡 Tips: Pastikan pencahayaan cukup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 p-6">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold"
              >
                Batal
              </button>
              <button 
                disabled
                className="flex-1 bg-gray-300 text-gray-500 py-4 rounded-2xl font-bold"
              >
                Memindai...
              </button>
            </div>
          </>
        ) : (
          // Hasil Deteksi dengan Bounding Box
          <>
            <div className="relative bg-gray-900 h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Gambar/Ilustrasi Makanan Terdeteksi */}
                <div className="text-9xl">🥔</div>
              </div>
              
              {/* Bounding Box dengan Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-400 w-64 h-64 rounded-2xl">
                {/* Corner Markers */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
                
                {/* Label Deteksi */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-400 text-black px-5 py-2 rounded-full font-bold shadow-lg">
                  ✓ Tempe Mentah (97%)
                </div>
              </div>

              {/* Info Deteksi */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur rounded-2xl p-3 text-white">
                  <p className="text-sm font-semibold">📦 Bahan Terdeteksi: Tempe</p>
                  <p className="text-xs opacity-90 mt-1">Kategori: Protein Nabati</p>
                </div>
              </div>
            </div>

            {/* Analysis Result */}
            <div className="p-6 space-y-4 pb-24">
              {/* Peringatan Defisit */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-orange-500 rounded-3xl p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500 rounded-full p-3 flex-shrink-0">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-orange-800 mb-2">⚠ PERINGATAN GIZI</h3>
                    <p className="text-gray-800 font-semibold mb-1">KURANG ZAT BESI!</p>
                    <p className="text-gray-700 text-sm">Tempe saja tidak cukup memenuhi kebutuhan zat besi harian untuk ibu hamil. Perlu tambahan protein hewani.</p>
                  </div>
                </div>
              </div>

              {/* Rekomendasi Pangan Lokal */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-3xl p-5 shadow-lg">
                <h3 className="font-bold text-xl text-blue-800 mb-1 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Rekomendasi Pangan Lokal
                </h3>
                <p className="text-sm text-gray-600 mb-4">Kombinasi terbaik untuk menu hari ini</p>
                
                <div className="space-y-3">
                  {/* Rekomendasi 1: Ikan Lele */}
                  <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">🐟</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg mb-1">Ikan Lele / Gabus</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold text-blue-700">Tinggi Zat Besi & Protein</span>
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            +50 Poin
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Fe: 2.5mg
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-700">
                        💡 <span className="font-semibold">Saran:</span> Tambahkan <span className="font-bold text-blue-700">1 porsi (100g)</span> ikan lele goreng atau kukus
                      </p>
                    </div>
                  </div>

                  {/* Rekomendasi 2: Daun Kelor */}
                  <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-green-200">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">🥬</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg mb-1">Daun Kelor</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold text-green-700">Kaya Zat Besi & Kalsium</span>
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            +30 Poin
                          </span>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Fe: 7mg
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-700">
                        💡 <span className="font-semibold">Saran:</span> Tambahkan <span className="font-bold text-green-700">1 mangkuk (50g)</span> sayur bening daun kelor
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setUserPoints(userPoints + 50);
                  setCurrentScreen('home');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                ✓ Selesai & Dapatkan +50 Poin
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  // Result After Scan
  const ResultScreen = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center gap-3">
        <button onClick={() => setCurrentScreen('home')} className="text-white">
          <span className="text-2xl">←</span>
        </button>
        <h1 className="text-xl font-bold">Hasil Analisis</h1>
      </div>

      {/* Detected Food Image */}
      <div className="relative bg-gray-100 h-56">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-2">🍲</div>
            <p className="text-gray-700 font-semibold">Tempe Goreng</p>
          </div>
        </div>
      </div>

      {/* Analysis Result */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Peringatan Defisit */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-orange-400 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-10 h-10 text-orange-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-orange-800 mb-1">PERINGATAN: KURANG ZAT BESI!</h3>
              <p className="text-gray-700 text-base">Menu saat ini belum memenuhi kebutuhan zat besi harian untuk ibu hamil.</p>
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4">
          <h3 className="font-bold text-lg text-blue-800 mb-3">💡 Rekomendasi Pangan Lokal</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-white rounded-xl p-3">
              <div className="text-5xl">🐟</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg">Ikan Lele/Gabus</p>
                <p className="text-gray-600 text-sm mb-2">Tinggi Protein & Zat Besi</p>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block text-xs font-semibold">
                  +50 Poin Misi
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mt-3 text-base">Tambahkan 1 porsi (100g) untuk memenuhi kebutuhan harian Anda.</p>
        </div>

        <button 
          onClick={() => {
            setUserPoints(userPoints + 50);
            setCurrentScreen('home');
          }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700"
        >
          Selesai & Kembali
        </button>
      </div>
    </div>
  );
  
  const AnalysisScreen = () => {
    const nutrientData = [
      { name: 'Protein', value: 85, color: 'bg-blue-500' },
      { name: 'Zat Besi', value: 45, color: 'bg-red-500' },
      { name: 'Zinc', value: 50, color: 'bg-orange-500' },
      { name: 'Kalsium', value: 75, color: 'bg-green-500' },
    ];

    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center gap-3">
          <button onClick={() => setCurrentScreen('home')} className="text-white">
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-bold">Analisis Gizi Detail</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Status Gauge */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-3xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="w-32 h-32 mx-auto relative">
                {/* Simplified Gauge Visual */}
                <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-8 border-red-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <AlertTriangle className="w-10 h-10 text-orange-600 mb-1" />
                  <p className="text-2xl font-bold text-orange-800">45%</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-orange-800 mt-3">DEFISIT GIZI TERDETEKSI</h3>
              <p className="text-gray-700 mt-1">Status: Perlu Perhatian</p>
            </div>
          </div>

          {/* Grafik Nutrisi */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">📊 Level Nutrisi Harian</h3>
            <div className="space-y-4">
              {nutrientData.map((nutrient, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">{nutrient.name}</span>
                    <span className={`font-bold ${nutrient.value < 60 ? 'text-red-600' : 'text-green-600'}`}>
                      {nutrient.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`${nutrient.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${nutrient.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rekomendasi Pangan Lokal */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-3xl p-6">
            <h3 className="font-bold text-xl text-blue-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Rekomendasi Pangan Lokal
            </h3>
            
            <div className="space-y-3">
              <FoodRecommendation 
                emoji="🐟"
                name="Ikan Lele/Gabus"
                benefit="Tinggi Protein & Zat Besi"
                portion="100g (1 porsi)"
                points={50}
              />
              <FoodRecommendation 
                emoji="🥬"
                name="Daun Kelor"
                benefit="Kaya Zinc & Kalsium"
                portion="50g (1 mangkuk)"
                points={30}
              />
              <FoodRecommendation 
                emoji="🥚"
                name="Telur Kampung"
                benefit="Protein Lengkap"
                portion="2 butir"
                points={40}
              />
            </div>
          </div>

          <button 
            onClick={() => setCurrentScreen('home')}
            className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  };

  const FoodRecommendation = ({ emoji, name, benefit, portion, points }) => (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-5xl">{emoji}</div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
          <p className="text-sm text-gray-600 mb-1">{benefit}</p>
          <p className="text-xs text-gray-500">Takaran: {portion}</p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded-xl text-center">
          <p className="text-xs font-semibold">+{points}</p>
          <p className="text-xs">Poin</p>
        </div>
      </div>
    </div>
  );

  // Rewards Screen
  const RewardsScreen = () => (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header with Saldo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="p-4 flex items-center gap-3">
          <button onClick={() => setCurrentScreen('home')} className="text-white">
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-bold">Tukar Poin</h1>
        </div>
        <div className="px-6 pb-6">
          <p className="text-sm opacity-90 mb-1">Poin Anda Tersedia</p>
          <h2 className="text-4xl font-bold">{userPoints}</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-6 pb-24">
        <h3 className="font-bold text-lg text-gray-800 mb-4">🎁 Hadiah Tersedia</h3>
        
        <div className="space-y-4">
          <RewardCard 
            icon={<Pill className="w-8 h-8" />}
            title="Vaksin Gratis"
            description="Voucher vaksin anak gratis di Puskesmas"
            points={2000}
            available={userPoints >= 2000}
          />
          <RewardCard 
            icon={<Heart className="w-8 h-8" />}
            title="Konsultasi Dokter"
            description="Potongan 50% konsultasi dokter anak"
            points={1500}
            available={userPoints >= 1500}
          />
          <RewardCard 
            icon={<Baby className="w-8 h-8" />}
            title="Paket Vitamin Anak"
            description="Paket vitamin lengkap untuk 1 bulan"
            points={1000}
            available={userPoints >= 1000}
          />
          <RewardCard 
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Voucher Belanja"
            description="Voucher belanja Rp 50.000 di toko lokal"
            points={800}
            available={userPoints >= 800}
          />
        </div>
      </div>
    </div>
  );

  const RewardCard = ({ icon, title, description, points, available }) => (
    <div className={`border-2 rounded-2xl p-5 ${available ? 'bg-white border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${available ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-bold text-lg mb-1 ${available ? 'text-gray-800' : 'text-gray-400'}`}>{title}</h4>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-700">{points} Poin</span>
            </div>
            <button 
              disabled={!available}
              className={`text-white px-5 py-2 rounded-xl font-semibold text-sm transition-colors ${available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'}`}
            >
              {available ? 'Tukar' : 'Terkunci'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Education Screen
  const EducationScreen = () => (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('home')} className="text-white">
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Pusat Edukasi
          </h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-6 space-y-6 pb-24">
        {/* Video Tutorial */}
        <div>
          <h2 className="font-bold text-lg text-gray-800 mb-3">📹 Video Tutorial MPASI</h2>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl overflow-hidden shadow-lg">
            <div className="relative h-48 flex items-center justify-center">
              <Play className="w-16 h-16 text-white opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                <p className="font-bold text-sm">Cara Membuat Bubur Ikan Lele untuk Bayi 6 Bulan</p>
                <p className="text-xs opacity-90 mt-1">Durasi: 5 menit • 234 tayangan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Forum Diskusi */}
        <div>
          <h2 className="font-bold text-lg text-gray-800 mb-3">💬 Forum Ibu & Bidan</h2>
          <div className="space-y-3">
            <ForumPost 
              author="Bu Siti"
              role="Ibu"
              message="Bagaimana cara mengatasi bayi yang susah makan sayur?"
              time="2 jam lalu"
            />
            <ForumPost 
              author="Bidan Ani"
              role="Nakes"
              message="Coba campurkan sayur dengan makanan favorit bayi, Bu. Bisa dicoba dengan bubur atau puree buah."
              time="1 jam lalu"
              isNakes={true}
            />
            <ForumPost 
              author="Bu Ratna"
              role="Ibu"
              message="Terima kasih tipsnya! Saya akan coba dengan pisang."
              time="30 menit lalu"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <input 
              type="text" 
              placeholder="Tulis pertanyaan Anda..."
              className="flex-1 border-2 border-gray-300 rounded-full px-4 py-3"
            />
            <button className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ForumPost = ({ author, role, message, time, isNakes }) => (
    <div className={`border-2 rounded-2xl p-4 ${isNakes ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${isNakes ? 'bg-blue-600' : 'bg-gray-400'}`}>
          {author.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-gray-800">{author}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${isNakes ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
              {role}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{message}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );

  // Chat AI Screen
  const ChatScreen = () => {
    const getAIResponse = (userMessage) => {
      const lowerMsg = userMessage.toLowerCase();
      
      if (lowerMsg.includes('bayi') && lowerMsg.includes('makan')) {
        return 'Untuk bayi 6-12 bulan, berikan MPASI dengan tekstur yang sesuai usianya. Mulai dari bubur halus, lalu bertahap ke makanan yang lebih padat. Pastikan mengandung protein (ikan, telur, ayam), karbohidrat (nasi, kentang), dan sayuran (wortel, bayam, kelor).';
      } else if (lowerMsg.includes('zat besi') || lowerMsg.includes('anemia')) {
        return 'Untuk mencegah anemia, konsumsi makanan tinggi zat besi seperti: 🐟 Ikan lele/gabus, 🥬 Daun kelor, 🥩 Daging merah, dan 🥚 Telur. Kombinasikan dengan vitamin C (jeruk, tomat) untuk penyerapan lebih baik!';
      } else if (lowerMsg.includes('kelor')) {
        return 'Daun kelor sangat bagus untuk ibu hamil dan menyusui! Kandungannya: Zat besi 7x lebih tinggi dari bayam, Kalsium 4x lebih tinggi dari susu, dan Vitamin C 7x lebih tinggi dari jeruk. Cara olah: buat sayur bening atau smoothie.';
      } else if (lowerMsg.includes('ikan')) {
        return 'Ikan lokal seperti lele dan gabus sangat baik untuk ibu hamil dan bayi! Kaya protein, omega-3, dan zat besi. Olah dengan cara dikukus atau digoreng dengan minyak sedikit. Hindari ikan tinggi merkuri seperti hiu.';
      } else if (lowerMsg.includes('hamil') || lowerMsg.includes('bumil')) {
        return 'Menu sehat ibu hamil harus mengandung: Protein (ikan, telur, tempe), Karbohidrat (nasi merah, ubi), Sayuran hijau (bayam, kelor), Buah-buahan, dan Air putih 8-10 gelas/hari. Hindari makanan mentah dan kafein berlebihan.';
      } else if (lowerMsg.includes('vitamin')) {
        return 'Vitamin penting untuk ibu hamil: Asam folat (sayuran hijau), Zat besi (ikan, daging merah), Kalsium (susu, ikan teri), Vitamin D (telur, ikan), dan Vitamin C (jeruk, tomat). Konsultasikan dengan bidan untuk suplemen tambahan.';
      } else {
        return 'Terima kasih atas pertanyaannya! Saya bisa membantu Anda dengan informasi seputar: Gizi ibu hamil, MPASI bayi, Resep makanan sehat, dan Tips kesehatan. Silakan tanyakan lebih spesifik ya! 😊';
      }
    };

    const handleSendMessage = () => {
      if (chatInput.trim() === '') return;

      const newUserMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        text: chatInput,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages([...chatMessages, newUserMessage]);
      const userQuestion = chatInput;
      setChatInput('');
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse = {
          id: chatMessages.length + 2,
          sender: 'ai',
          text: getAIResponse(userQuestion),
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    };

    const handleQuickQuestion = (question) => {
      setChatInput(question);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    };

    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => setCurrentScreen('home')} className="text-white">
            <span className="text-2xl">←</span>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Chat Asisten Gizi</h1>
            <p className="text-xs opacity-90">AI-Powered Nutrition Assistant</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-md ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-200'}`}>
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <span className="font-semibold text-blue-600 text-sm">Asisten Gizi</span>
                  </div>
                )}
                <p className={`text-sm ${msg.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>{msg.text}</p>
                <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-md">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions */}
        <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
          <p className="text-xs text-gray-600 mb-2">💡 Pertanyaan Cepat:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button 
              onClick={() => handleQuickQuestion('Menu apa yang bagus untuk ibu hamil?')}
              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-blue-200"
            >
              Menu Ibu Hamil
            </button>
            <button 
              onClick={() => handleQuickQuestion('Bagaimana cara mengatasi anemia?')}
              className="bg-orange-100 text-orange-700 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-orange-200"
            >
              Atasi Anemia
            </button>
            <button 
              onClick={() => handleQuickQuestion('Manfaat daun kelor untuk bumil')}
              className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-green-200"
            >
              Daun Kelor
            </button>
          </div>
        </div>

        {/* Input Chat */}
        <div className="p-4 bg-white border-t-2 border-gray-200 flex gap-2 flex-shrink-0">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik pertanyaan Anda..."
            className="flex-1 border-2 border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // Profile Screen
  const ProfileScreen = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
      name: userName || 'Pengguna',
      age: 28,
      phone: '0812-3456-7890',
      address: 'Desa Sukamaju, Kec. Cianjur',
      pregnancyWeek: 24,
      childAge: 8,
      childName: 'Ahmad Fauzan',
      lastCheckup: '15 November 2025'
    });

    const handleLogout = () => {
      // Save current user data to database before logout
      if (userName) {
        setUserDatabase({
          ...userDatabase,
          [userName]: {
            points: userPoints,
            level: userLevel
          }
        });
      }
      
      // Reset to login screen
      setCurrentScreen('login');
      // Don't reset userName immediately to allow database save
    };

    return (
      <div className="h-full overflow-y-auto bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentScreen('home')} className="text-white">
              <span className="text-2xl">←</span>
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold"
            >
              {isEditing ? 'Simpan' : 'Edit Profil'}
            </button>
          </div>

          {/* Profile Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold">{userName || 'Pengguna'}</h1>
            <p className="text-sm opacity-90">Member sejak Januari 2025</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 pb-24 space-y-6">
          {/* Personal Info */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-5">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Data Pribadi
            </h3>
            <div className="space-y-3">
              <ProfileField label="Nama Lengkap" value={userName || 'Pengguna'} isEditing={isEditing} />
              <ProfileField label="Tanggal Lahir" value={userBirthDate || '-'} isEditing={isEditing} />
              <ProfileField label="Usia Saat Ini" value={`${userAge} tahun`} isEditing={false} />
              <ProfileField label="Nomor HP" value={userPhone || '-'} isEditing={isEditing} />
              <ProfileField label="Alamat" value={userAddress || '-'} isEditing={isEditing} />
            </div>
          </div>

          {/* Pregnancy Info */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-300 rounded-3xl p-5">
            <h3 className="font-bold text-lg text-pink-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              Info Kehamilan
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Usia Kehamilan</span>
                <span className="text-pink-700 font-bold text-lg">{profileData.pregnancyWeek} Minggu</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Trimester</span>
                <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">Trimester 2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Pemeriksaan Terakhir</span>
                <span className="text-gray-700">{profileData.lastCheckup}</span>
              </div>
            </div>
          </div>

          {/* Child Info */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-3xl p-5">
            <h3 className="font-bold text-lg text-blue-800 mb-4 flex items-center gap-2">
              <Baby className="w-5 h-5 text-blue-600" />
              Info Anak
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Nama Anak</span>
                <span className="text-blue-700 font-bold">{profileData.childName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Usia</span>
                <span className="text-blue-700 font-bold">{profileData.childAge} Bulan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Status Gizi</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Normal</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-3xl p-5">
            <h3 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              Statistik Saya
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">{userPoints}</p>
                <p className="text-sm text-gray-600">Total Poin</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">42</p>
                <p className="text-sm text-gray-600">Scan Selesai</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">28</p>
                <p className="text-sm text-gray-600">Misi Selesai</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">Level {userLevel}</p>
                <p className="text-sm text-gray-600">Status</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-red-600 transition-colors"
          >
            Keluar dari Akun
          </button>
        </div>
      </div>
    );
  };

  const ProfileField = ({ label, value, isEditing }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="text-gray-600 text-sm font-semibold">{label}</span>
      {isEditing ? (
        <input 
          type="text" 
          defaultValue={value}
          className="text-gray-800 text-sm font-semibold text-right border-b-2 border-blue-500 focus:outline-none"
        />
      ) : (
        <span className="text-gray-800 text-sm font-semibold">{value}</span>
      )}
    </div>
  );

  // Bottom Navigation - Gaya DANA dengan Tombol PINDAI di Tengah
  const BottomNav = () => (
    <div className="bg-white border-t-2 border-gray-200 px-2 py-2 flex justify-around items-end relative">
      <NavButton 
        icon={<Home />} 
        label="Beranda" 
        active={currentScreen === 'home'} 
        onClick={() => setCurrentScreen('home')} 
      />
      <NavButton 
        icon={<FileText />} 
        label="Laporan" 
        active={currentScreen === 'analysis'} 
        onClick={() => setCurrentScreen('analysis')} 
      />
      
      {/* Tombol PINDAI Besar di Tengah - Gaya DANA PAY Button */}
      <div className="relative -mt-8">
        <button 
          onClick={() => setCurrentScreen('scan')}
          className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-white"
        >
          <Camera className="w-8 h-8 text-white" />
        </button>
        <p className="text-xs font-semibold text-gray-700 text-center mt-2">PINDAI</p>
      </div>
      
      <NavButton 
        icon={<Gift />} 
        label="Hadiah" 
        active={currentScreen === 'rewards'} 
        onClick={() => setCurrentScreen('rewards')} 
      />
      <NavButton 
        icon={<User />} 
        label="Profil" 
        active={currentScreen === 'profile'} 
        onClick={() => setCurrentScreen('profile')} 
      />
    </div>
  );

  const NavButton = ({ icon, label, active, onClick }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600' : 'text-gray-400'}`}
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white shadow-2xl relative">
      <button 
        onClick={() => setIsOnline(!isOnline)}
        className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur px-3 py-2 rounded-full text-xs font-semibold shadow-lg"
      >
        {isOnline ? 'Online' : 'Offline'}
      </button>

      <div className="flex-1 overflow-hidden">
        {currentScreen === 'login' && renderLoginScreen()}
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'scan' && <ScanScreen />}
        {currentScreen === 'analysis' && <AnalysisScreen />}
        {currentScreen === 'rewards' && <RewardsScreen />}
        {currentScreen === 'education' && <EducationScreen />}
        {currentScreen === 'chat' && <ChatScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </div>

      {showLevelModal && <LevelModal />}
      {showOfflineModal && <OfflineModal />}
      {currentScreen !== 'login' && <BottomNav />}
    </div>
  );
};

export default NutriSnapApp;