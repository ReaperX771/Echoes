import React, { useEffect, useRef, useState } from 'react';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Array of 10 question sets (each with 10 harder questions)
const questionSets = [
  // Set 1
  [
    {
      id: 'q1-1',
      text: 'Which companion compiled the Quran into a single book under Caliph Abu Bakr?',
      options: ['Zayd ibn Thabit', 'Uthman ibn Affan', 'Ali ibn Abi Talib', 'Umar ibn al-Khattab'],
      correct: 'Zayd ibn Thabit',
    },
    {
      id: 'q1-2',
      text: 'What is the term for the discretionary charity given beyond Zakat?',
      options: ['Sadaqah', 'Khums', 'Jizyah', 'Ushr'],
      correct: 'Sadaqah',
    },
    {
      id: 'q1-3',
      text: 'Which battle occurred in 627 CE and is known for the trench dug around Medina?',
      options: ['Battle of Uhud', 'Battle of Khandaq', 'Battle of Hunayn', 'Battle of Tabuk'],
      correct: 'Battle of Khandaq',
    },
    {
      id: 'q1-4',
      text: 'Which Surah contains the Verse of the Throne (Ayat al-Kursi)?',
      options: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Al-Ikhlas', 'Surah Al-Kahf'],
      correct: 'Surah Al-Baqarah',
    },
    {
      id: 'q1-5',
      text: 'What is the name of the treaty signed with the Quraysh in 628 CE?',
      options: ['Treaty of Najran', 'Treaty of Hudaybiyyah', 'Pact of Umar', 'Treaty of Aqabah'],
      correct: 'Treaty of Hudaybiyyah',
    },
    {
      id: 'q1-6',
      text: 'Which Prophet is associated with the construction of the Kaaba?',
      options: ['Prophet Ismail and Prophet Ibrahim', 'Prophet Musa and Prophet Harun', 'Prophet Dawud and Prophet Sulaiman', 'Prophet Nuh and Prophet Hud'],
      correct: 'Prophet Ismail and Prophet Ibrahim',
    },
    {
      id: 'q1-7',
      text: 'What is the term for the process of determining the permissibility of food in Islam?',
      options: ['Tayammum', 'Tafsir', 'Halal certification', 'Istihsan'],
      correct: 'Halal certification',
    },
    {
      id: 'q1-8',
      text: 'Which companion was known as the "Sword of Allah"?',
      options: ['Hamza ibn Abdul-Muttalib', 'Khalid ibn al-Walid', 'Sa’d ibn Abi Waqqas', 'Bilal ibn Rabah'],
      correct: 'Khalid ibn al-Walid',
    },
    {
      id: 'q1-9',
      text: 'In which year was the conquest of Mecca achieved?',
      options: ['625 CE', '627 CE', '630 CE', '632 CE'],
      correct: '630 CE',
    },
    {
      id: 'q1-10',
      text: 'What is the name of the collection of Hadith compiled by Imam Muslim?',
      options: ['Sahih al-Bukhari', 'Sahih Muslim', 'Sunan Abu Dawud', 'Jami’ at-Tirmidhi'],
      correct: 'Sahih Muslim',
    },
  ],
  // Set 2
  [
    {
      id: 'q2-1',
      text: 'Which Surah is recited in every rak’ah of Salah?',
      options: ['Surah Al-Ikhlas', 'Surah Al-Fatiha', 'Surah An-Nas', 'Surah Al-Kawthar'],
      correct: 'Surah Al-Fatiha',
    },
    {
      id: 'q2-2',
      text: 'Who was the first Muezzin of Islam?',
      options: ['Bilal ibn Rabah', 'Abdullah ibn Mas’ud', 'Abu Hurairah', 'Anas ibn Malik'],
      correct: 'Bilal ibn Rabah',
    },
    {
      id: 'q2-3',
      text: 'What is the name of the tax levied on non-Muslims in an Islamic state?',
      options: ['Zakat', 'Jizyah', 'Sadaqah', 'Khums'],
      correct: 'Jizyah',
    },
    {
      id: 'q2-4',
      text: 'Which Prophet was swallowed by a whale?',
      options: ['Prophet Yunus', 'Prophet Yusuf', 'Prophet Ayyub', 'Prophet Zakariyya'],
      correct: 'Prophet Yunus',
    },
    {
      id: 'q2-5',
      text: 'What is the term for the pilgrimage to Mecca performed outside Hajj season?',
      options: ['Umrah', 'Tawaf', 'Sa’i', 'Hajj al-Tamattu'],
      correct: 'Umrah',
    },
    {
      id: 'q2-6',
      text: 'Which Caliph is credited with establishing the Islamic calendar?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correct: 'Umar ibn al-Khattab',
    },
    {
      id: 'q2-7',
      text: 'Which Surah narrates the story of the People of the Cave?',
      options: ['Surah Al-Kahf', 'Surah Maryam', 'Surah Al-Anbiya', 'Surah Ash-Sharh'],
      correct: 'Surah Al-Kahf',
    },
    {
      id: 'q2-8',
      text: 'What is the name of the mountain where Prophet Muhammad received his first revelation?',
      options: ['Mount Uhud', 'Mount Hira', 'Mount Safa', 'Mount Arafat'],
      correct: 'Mount Hira',
    },
    {
      id: 'q2-9',
      text: 'Which companion was known as the "Trustworthy" (Al-Amin)?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Prophet Muhammad', 'Abdullah ibn Umar'],
      correct: 'Prophet Muhammad',
    },
    {
      id: 'q2-10',
      text: 'What is the term for the Islamic legal rulings derived by scholars?',
      options: ['Fatwa', 'Qiyas', 'Ijma', 'Hadith'],
      correct: 'Fatwa',
    },
  ],
  // Set 3
  [
    {
      id: 'q3-1',
      text: 'Which Surah is known as the "Chapter of Purity"?',
      options: ['Surah Al-Ikhlas', 'Surah Al-Falaq', 'Surah An-Nas', 'Surah Al-Masad'],
      correct: 'Surah Al-Ikhlas',
    },
    {
      id: 'q3-2',
      text: 'Who was the wife of Prophet Muhammad known for her business acumen?',
      options: ['Aisha bint Abi Bakr', 'Khadijah bint Khuwaylid', 'Hafsa bint Umar', 'Zaynab bint Jahsh'],
      correct: 'Khadijah bint Khuwaylid',
    },
    {
      id: 'q3-3',
      text: 'What is the name of the event when Muslims migrated from Mecca to Medina?',
      options: ['Hijrah', 'Isra and Mi’raj', 'Laylat al-Qadr', 'Battle of Badr'],
      correct: 'Hijrah',
    },
    {
      id: 'q3-4',
      text: 'Which angel is responsible for blowing the trumpet on the Day of Judgment?',
      options: ['Jibril', 'Mikail', 'Israfil', 'Azrail'],
      correct: 'Israfil',
    },
    {
      id: 'q3-5',
      text: 'What is the term for the ritual purification before Salah?',
      options: ['Ghusl', 'Wudu', 'Tayammum', 'Istinja'],
      correct: 'Wudu',
    },
    {
      id: 'q3-6',
      text: 'Which battle marked the first major defeat for the Muslims?',
      options: ['Battle of Badr', 'Battle of Uhud', 'Battle of Khandaq', 'Battle of Tabuk'],
      correct: 'Battle of Uhud',
    },
    {
      id: 'q3-7',
      text: 'Which Surah is recommended to be recited every Friday?',
      options: ['Surah Al-Kahf', 'Surah Al-Mulk', 'Surah Ar-Rahman', 'Surah Ad-Duha'],
      correct: 'Surah Al-Kahf',
    },
    {
      id: 'q3-8',
      text: 'What is the name of the bridge that souls must cross on the Day of Judgment?',
      options: ['Sirat', 'Barzakh', 'Mizan', 'Hawd'],
      correct: 'Sirat',
    },
    {
      id: 'q3-9',
      text: 'Which companion narrated the most Hadiths?',
      options: ['Abu Hurairah', 'Aisha bint Abi Bakr', 'Anas ibn Malik', 'Abdullah ibn Abbas'],
      correct: 'Abu Hurairah',
    },
    {
      id: 'q3-10',
      text: 'What is the term for the consensus of Islamic scholars on a legal issue?',
      options: ['Qiyas', 'Ijma', 'Istihsan', 'Uruf'],
      correct: 'Ijma',
    },
  ],
  // Set 4
  [
    {
      id: 'q4-1',
      text: 'Which Prophet is known as the "Father of the Prophets"?',
      options: ['Prophet Ibrahim', 'Prophet Nuh', 'Prophet Musa', 'Prophet Muhammad'],
      correct: 'Prophet Ibrahim',
    },
    {
      id: 'q4-2',
      text: 'What is the name of the book revealed to Prophet Musa?',
      options: ['Torah', 'Zabur', 'Injil', 'Quran'],
      correct: 'Torah',
    },
    {
      id: 'q4-3',
      text: 'Which companion was the first to lead the Hajj after the Prophet’s death?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correct: 'Abu Bakr',
    },
    {
      id: 'q4-4',
      text: 'What is the term for the obligatory charity given annually by Muslims?',
      options: ['Sadaqah', 'Zakat', 'Khums', 'Fitrah'],
      correct: 'Zakat',
    },
    {
      id: 'q4-5',
      text: 'Which Surah describes the Night Journey of Prophet Muhammad?',
      options: ['Surah Al-Isra', 'Surah Al-Maidah', 'Surah Al-Anfal', 'Surah Al-Hajj'],
      correct: 'Surah Al-Isra',
    },
    {
      id: 'q4-6',
      text: 'Which Caliph standardized the Quran’s text?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correct: 'Uthman ibn Affan',
    },
    {
      id: 'q4-7',
      text: 'What is the name of the well in Mecca associated with Hajj?',
      options: ['Zamzam', 'Kawthar', 'Salsabil', 'Barakah'],
      correct: 'Zamzam',
    },
    {
      id: 'q4-8',
      text: 'Which Prophet was known for his patience during trials?',
      options: ['Prophet Ayyub', 'Prophet Yusuf', 'Prophet Yunus', 'Prophet Zakariyya'],
      correct: 'Prophet Ayyub',
    },
    {
      id: 'q4-9',
      text: 'What is the term for the Islamic legal analogy used in jurisprudence?',
      options: ['Ijma', 'Qiyas', 'Fatwa', 'Tafsir'],
      correct: 'Qiyas',
    },
    {
      id: 'q4-10',
      text: 'Which Surah is known as the "Chapter of Light"?',
      options: ['Surah An-Nur', 'Surah Al-Mulk', 'Surah Ar-Rahman', 'Surah Al-Waqi’ah'],
      correct: 'Surah An-Nur',
    },
  ],
  // Set 5
  [
    {
      id: 'q5-1',
      text: 'Which Prophet was sent to the people of Thamud?',
      options: ['Prophet Salih', 'Prophet Hud', 'Prophet Shu’ayb', 'Prophet Lut'],
      correct: 'Prophet Salih',
    },
    {
      id: 'q5-2',
      text: 'What is the name of the book revealed to Prophet Dawud?',
      options: ['Torah', 'Zabur', 'Injil', 'Quran'],
      correct: 'Zabur',
    },
    {
      id: 'q5-3',
      text: 'Which companion was known as the "Lion of Allah"?',
      options: ['Hamza ibn Abdul-Muttalib', 'Khalid ibn al-Walid', 'Sa’d ibn Abi Waqqas', 'Ali ibn Abi Talib'],
      correct: 'Hamza ibn Abdul-Muttalib',
    },
    {
      id: 'q5-4',
      text: 'Which Surah contains the story of Prophet Yusuf?',
      options: ['Surah Al-Anbiya', 'Surah Yusuf', 'Surah Maryam', 'Surah Al-Qasas'],
      correct: 'Surah Yusuf',
    },
    {
      id: 'q5-5',
      text: 'What is the term for the state of ritual purity required for Hajj?',
      options: ['Ihram', 'Wudu', 'Ghusl', 'Tayammum'],
      correct: 'Ihram',
    },
    {
      id: 'q5-6',
      text: 'Which battle was fought in 629 CE against the Byzantine Empire?',
      options: ['Battle of Mu’tah', 'Battle of Hunayn', 'Battle of Tabuk', 'Battle of Khandaq'],
      correct: 'Battle of Mu’tah',
    },
    {
      id: 'q5-7',
      text: 'Which Surah is known as the "Chapter of the Elephant"?',
      options: ['Surah Al-Fil', 'Surah Al-Qari’ah', 'Surah Al-Zalzalah', 'Surah Al-Humazah'],
      correct: 'Surah Al-Fil',
    },
    {
      id: 'q5-8',
      text: 'Who was the first woman to accept Islam?',
      options: ['Khadijah bint Khuwaylid', 'Aisha bint Abi Bakr', 'Fatimah bint Muhammad', 'Sumayyah bint Khayyat'],
      correct: 'Khadijah bint Khuwaylid',
    },
    {
      id: 'q5-9',
      text: 'What is the term for the Islamic practice of dry ablution when water is unavailable?',
      options: ['Wudu', 'Ghusl', 'Tayammum', 'Istinja'],
      correct: 'Tayammum',
    },
    {
      id: 'q5-10',
      text: 'Which companion was martyred at the Battle of Yamama?',
      options: ['Mus’ab ibn Umair', 'Zayd ibn Harithah', 'Ja’far ibn Abi Talib', 'Abdullah ibn Rawahah'],
      correct: 'Zayd ibn Harithah',
    },
  ],
  // Set 6
  [
    {
      id: 'q6-1',
      text: 'Which Prophet was sent to the people of Ad?',
      options: ['Prophet Hud', 'Prophet Salih', 'Prophet Shu’ayb', 'Prophet Lut'],
      correct: 'Prophet Hud',
    },
    {
      id: 'q6-2',
      text: 'What is the name of the book revealed to Prophet Isa?',
      options: ['Torah', 'Zabur', 'Injil', 'Quran'],
      correct: 'Injil',
    },
    {
      id: 'q6-3',
      text: 'Which companion was known as the "Truthful" (As-Siddiq)?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correct: 'Abu Bakr',
    },
    {
      id: 'q6-4',
      text: 'Which Surah narrates the story of Prophet Musa and Pharaoh?',
      options: ['Surah Al-Qasas', 'Surah Al-Anbiya', 'Surah Taha', 'Surah Ash-Sharh'],
      correct: 'Surah Taha',
    },
    {
      id: 'q6-5',
      text: 'What is the term for the ritual of running between Safa and Marwah during Hajj?',
      options: ['Tawaf', 'Sa’i', 'Ramy al-Jamarat', 'Arafah'],
      correct: 'Sa’i',
    },
    {
      id: 'q6-6',
      text: 'Which Caliph was assassinated during his prayer in 661 CE?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correct: 'Ali ibn Abi Talib',
    },
    {
      id: 'q6-7',
      text: 'Which Surah is known as the "Chapter of Sovereignty"?',
      options: ['Surah Al-Mulk', 'Surah Ar-Rahman', 'Surah Al-Waqi’ah', 'Surah Al-Kahf'],
      correct: 'Surah Al-Mulk',
    },
    {
      id: 'q6-8',
      text: 'What is the name of the event when Prophet Muhammad ascended to the heavens?',
      options: ['Hijrah', 'Isra and Mi’raj', 'Laylat al-Qadr', 'Battle of Badr'],
      correct: 'Isra and Mi’raj',
    },
    {
      id: 'q6-9',
      text: 'Which companion was known for his knowledge of genealogy?',
      options: ['Abu Hurairah', 'Abdullah ibn Abbas', 'Anas ibn Malik', 'Abu Dharr al-Ghifari'],
      correct: 'Abdullah ibn Abbas',
    },
    {
      id: 'q6-10',
      text: 'What is the term for the Islamic practice of equitable preference in jurisprudence?',
      options: ['Qiyas', 'Ijma', 'Istihsan', 'Uruf'],
      correct: 'Istihsan',
    },
  ],
  // Set 7
  [
    {
      id: 'q7-1',
      text: 'Which Prophet was known for building the Ark?',
      options: ['Prophet Nuh', 'Prophet Hud', 'Prophet Salih', 'Prophet Shu’ayb'],
      correct: 'Prophet Nuh',
    },
    {
      id: 'q7-2',
      text: 'What is the name of the valley where Hajj pilgrims stand in prayer on the 9th of Dhul-Hijjah?',
      options: ['Arafat', 'Muzdalifah', 'Mina', 'Jamarat'],
      correct: 'Arafat',
    },
    {
      id: 'q7-3',
      text: 'Which companion was the scribe of the Prophet’s revelations?',
      options: ['Zayd ibn Thabit', 'Mu’awiyah ibn Abi Sufyan', 'Abdullah ibn Mas’ud', 'Umar ibn al-Khattab'],
      correct: 'Zayd ibn Thabit',
    },
    {
      id: 'q7-4',
      text: 'Which Surah is known as the "Chapter of the Cow"?',
      options: ['Surah Al-Baqarah', 'Surah Al-Ma’idah', 'Surah Al-An’am', 'Surah Al-Nahl'],
      correct: 'Surah Al-Baqarah',
    },
    {
      id: 'q7-5',
      text: 'What is the term for the ritual stoning during Hajj?',
      options: ['Tawaf', 'Sa’i', 'Ramy al-Jamarat', 'Ihram'],
      correct: 'Ramy al-Jamarat',
    },
    {
      id: 'q7-6',
      text: 'Which battle was fought in 630 CE after the violation of the Treaty of Hudaybiyyah?',
      options: ['Battle of Hunayn', 'Battle of Tabuk', 'Battle of Mu’tah', 'Conquest of Mecca'],
      correct: 'Battle of Hunayn',
    },
    {
      id: 'q7-7',
      text: 'Which Surah is known as the "Chapter of the Merciful"?',
      options: ['Surah Ar-Rahman', 'Surah Al-Mulk', 'Surah Al-Waqi’ah', 'Surah Al-Kahf'],
      correct: 'Surah Ar-Rahman',
    },
    {
      id: 'q7-8',
      text: 'Which companion was the first to die as a martyr in Islam?',
      options: ['Sumayyah bint Khayyat', 'Yasir ibn Amir', 'Hamza ibn Abdul-Muttalib', 'Mus’ab ibn Umair'],
      correct: 'Sumayyah bint Khayyat',
    },
    {
      id: 'q7-9',
      text: 'What is the term for the barrier between life and the afterlife in Islam?',
      options: ['Sirat', 'Barzakh', 'Mizan', 'Hawd'],
      correct: 'Barzakh',
    },
    {
      id: 'q7-10',
      text: 'Which companion was known as the "Interpreter of the Quran"?',
      options: ['Abdullah ibn Abbas', 'Abu Hurairah', 'Anas ibn Malik', 'Abdullah ibn Mas’ud'],
      correct: 'Abdullah ibn Abbas',
    },
  ],
  // Set 8
  [
    {
      id: 'q8-1',
      text: 'Which Prophet was sent to the people of Madyan?',
      options: ['Prophet Shu’ayb', 'Prophet Hud', 'Prophet Salih', 'Prophet Lut'],
      correct: 'Prophet Shu’ayb',
    },
    {
      id: 'q8-2',
      text: 'What is the name of the pool from which believers will drink on the Day of Judgment?',
      options: ['Zamzam', 'Kawthar', 'Salsabil', 'Barakah'],
      correct: 'Kawthar',
    },
    {
      id: 'q8-3',
      text: 'Which companion was the first to lead prayers in the Prophet’s absence?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correct: 'Abu Bakr',
    },
    {
      id: 'q8-4',
      text: 'Which Surah narrates the story of Maryam and Prophet Isa?',
      options: ['Surah Maryam', 'Surah Al-Imran', 'Surah Al-Ma’idah', 'Surah Al-Anbiya'],
      correct: 'Surah Maryam',
    },
    {
      id: 'q8-5',
      text: 'What is the term for the circumambulation around the Kaaba?',
      options: ['Tawaf', 'Sa’i', 'Ramy al-Jamarat', 'Ihram'],
      correct: 'Tawaf',
    },
    {
      id: 'q8-6',
      text: 'Which battle was fought in 631 CE with no direct combat?',
      options: ['Battle of Tabuk', 'Battle of Hunayn', 'Battle of Mu’tah', 'Conquest of Mecca'],
      correct: 'Battle of Tabuk',
    },
    {
      id: 'q8-7',
      text: 'Which Surah is known as the "Chapter of the Event"?',
      options: ['Surah Al-Waqi’ah', 'Surah Al-Qari’ah', 'Surah Al-Zalzalah', 'Surah Al-Humazah'],
      correct: 'Surah Al-Waqi’ah',
    },
    {
      id: 'q8-8',
      text: 'Which companion was known as the "Father of the Poor"?',
      options: ['Abu Hurairah', 'Abu Dharr al-Ghifari', 'Abdullah ibn Umar', 'Anas ibn Malik'],
      correct: 'Abu Dharr al-Ghifari',
    },
    {
      id: 'q8-9',
      text: 'What is the term for the scale that weighs deeds on the Day of Judgment?',
      options: ['Sirat', 'Barzakh', 'Mizan', 'Hawd'],
      correct: 'Mizan',
    },
    {
      id: 'q8-10',
      text: 'Which Surah is known as the "Chapter of the Table Spread"?',
      options: ['Surah Al-Ma’idah', 'Surah Al-An’am', 'Surah Al-Nahl', 'Surah Al-Baqarah'],
      correct: 'Surah Al-Ma’idah',
    },
  ],
  // Set 9
  [
    {
      id: 'q9-1',
      text: 'Which Prophet was thrown into a fire but was unharmed?',
      options: ['Prophet Ibrahim', 'Prophet Musa', 'Prophet Yusuf', 'Prophet Ayyub'],
      correct: 'Prophet Ibrahim',
    },
    {
      id: 'q9-2',
      text: 'What is the name of the night when the Quran was first revealed?',
      options: ['Laylat al-Qadr', 'Laylat al-Mi’raj', 'Laylat al-Bara’ah', 'Laylat al-Isra'],
      correct: 'Laylat al-Qadr',
    },
    {
      id: 'q9-3',
      text: 'Which companion was known as the "Commander of the Faithful"?',
      options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correct: 'Ali ibn Abi Talib',
    },
    {
      id: 'q9-4',
      text: 'Which Surah narrates the story of the People of the Elephant?',
      options: ['Surah Al-Fil', 'Surah Al-Qari’ah', 'Surah Al-Zalzalah', 'Surah Al-Humazah'],
      correct: 'Surah Al-Fil',
    },
    {
      id: 'q9-5',
      text: 'What is the term for the charity given at the end of Ramadan?',
      options: ['Zakat', 'Sadaqah', 'Zakat al-Fitr', 'Khums'],
      correct: 'Zakat al-Fitr',
    },
    {
      id: 'q9-6',
      text: 'Which companion was martyred at the Battle of Badr?',
      options: ['Ubaydah ibn al-Harith', 'Zayd ibn Harithah', 'Ja’far ibn Abi Talib', 'Abdullah ibn Rawahah'],
      correct: 'Ubaydah ibn al-Harith',
    },
    {
      id: 'q9-7',
      text: 'Which Surah is known as the "Chapter of the Bee"?',
      options: ['Surah Al-Nahl', 'Surah Al-An’am', 'Surah Al-Ma’idah', 'Surah Al-Baqarah'],
      correct: 'Surah Al-Nahl',
    },
    {
      id: 'q9-8',
      text: 'Which Prophet was known for his wisdom and kingdom?',
      options: ['Prophet Sulaiman', 'Prophet Dawud', 'Prophet Yusuf', 'Prophet Zakariyya'],
      correct: 'Prophet Sulaiman',
    },
    {
      id: 'q9-9',
      text: 'What is the term for the Islamic practice of customary law?',
      options: ['Qiyas', 'Ijma', 'Istihsan', 'Uruf'],
      correct: 'Uruf',
    },
    {
      id: 'q9-10',
      text: 'Which Surah is known as the "Chapter of the Prophets"?',
      options: ['Surah Al-Anbiya', 'Surah Al-Qasas', 'Surah Taha', 'Surah Maryam'],
      correct: 'Surah Al-Anbiya',
    },
  ],
  // Set 10
  [
    {
      id: 'q10-1',
      text: 'Which Prophet was sent to the people of Sodom?',
      options: ['Prophet Lut', 'Prophet Hud', 'Prophet Salih', 'Prophet Shu’ayb'],
      correct: 'Prophet Lut',
    },
    {
      id: 'q10-2',
      text: 'What is the name of the mountain where pilgrims collect pebbles during Hajj?',
      options: ['Muzdalifah', 'Arafat', 'Mina', 'Jamarat'],
      correct: 'Muzdalifah',
    },
    {
      id: 'q10-3',
      text: 'Which companion was known as the "Father of Kittens"?',
      options: ['Abu Hurairah', 'Abdullah ibn Umar', 'Anas ibn Malik', 'Abu Dharr al-Ghifari'],
      correct: 'Abu Hurairah',
    },
    {
      id: 'q10-4',
      text: 'Which Surah is known as the "Chapter of the Earthquake"?',
      options: ['Surah Al-Zalzalah', 'Surah Al-Qari’ah', 'Surah Al-Humazah', 'Surah Al-Fil'],
      correct: 'Surah Al-Zalzalah',
    },
    {
      id: 'q10-5',
      text: 'What is the term for the full-body ritual purification in Islam?',
      options: ['Wudu', 'Ghusl', 'Tayammum', 'Istinja'],
      correct: 'Ghusl',
    },
    {
      id: 'q10-6',
      text: 'Which battle was fought in 624 CE and marked the first major victory for Muslims?',
      options: ['Battle of Badr', 'Battle of Uhud', 'Battle of Khandaq', 'Battle of Mu’tah'],
      correct: 'Battle of Badr',
    },
    {
      id: 'q10-7',
      text: 'Which Surah is known as the "Chapter of the Calamity"?',
      options: ['Surah Al-Qari’ah', 'Surah Al-Zalzalah', 'Surah Al-Humazah', 'Surah Al-Fil'],
      correct: 'Surah Al-Qari’ah',
    },
    {
      id: 'q10-8',
      text: 'Which companion was the daughter of Prophet Muhammad and married to Ali?',
      options: ['Fatimah bint Muhammad', 'Aisha bint Abi Bakr', 'Hafsa bint Umar', 'Zaynab bint Jahsh'],
      correct: 'Fatimah bint Muhammad',
    },
    {
      id: 'q10-9',
      text: 'What is the term for the exegesis of the Quran?',
      options: ['Tafsir', 'Hadith', 'Fiqh', 'Tajwid'],
      correct: 'Tafsir',
    },
    {
      id: 'q10-10',
      text: 'Which Surah is known as the "Chapter of the Slanderer"?',
      options: ['Surah Al-Humazah', 'Surah Al-Qari’ah', 'Surah Al-Zalzalah', 'Surah Al-Fil'],
      correct: 'Surah Al-Humazah',
    },
  ],
];

function Quiz() {
  const questionRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);
  const [transitionState, setTransitionState] = useState('idle');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);

  // Function to get current question set based on day of the year
  const getCurrentQuestionSet = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return questionSets[dayOfYear % questionSets.length]; // Rotate through 10 sets
  };

  // Initialize shuffled questions on component mount
  useEffect(() => {
    const initializeQuestions = () => {
      const currentSet = getCurrentQuestionSet();
      const shuffled = shuffleArray(currentSet).map((question) => ({
        ...question,
        options: shuffleArray([...question.options]),
      }));
      setShuffledQuestions(shuffled);
      const now = new Date();
      setCurrentDay(Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)));
    };
    initializeQuestions();
  }, []);

  // Check for day change to update question set
  useEffect(() => {
    const checkDayChange = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now - startOfYear;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      if (dayOfYear !== currentDay) {
        const currentSet = getCurrentQuestionSet();
        const shuffled = shuffleArray(currentSet).map((question) => ({
          ...question,
          options: shuffleArray([...question.options]),
        }));
        setShuffledQuestions(shuffled);
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        setTransitionState('entering-next');
        setVisible(true);
        setCurrentDay(dayOfYear);
        console.log('Day changed, new question set loaded:', dayOfYear);
      }
    };

    const interval = setInterval(checkDayChange, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, [currentDay]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported; question card will be visible.');
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
          console.log(`Question ${shuffledQuestions[currentQuestion]?.id} isIntersecting: ${entry.isIntersecting}`);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    if (questionRef.current) {
      observer.observe(questionRef.current);
      console.log(`Observing question ${shuffledQuestions[currentQuestion]?.id}`);
    } else {
      console.warn(`Ref for question ${shuffledQuestions[currentQuestion]?.id} is not assigned.`);
    }

    if (questionRef.current) {
      const rect = questionRef.current.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      if (isInViewport) {
        setVisible(true);
        console.log(`Question ${shuffledQuestions[currentQuestion]?.id} is initially in viewport`);
      }
    }

    return () => {
      if (questionRef.current) {
        observer.unobserve(questionRef.current);
      }
    };
  }, [currentQuestion, shuffledQuestions]);

  const handleAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setTransitionState('exiting-next');
      console.log('Transition: exiting-next to question', currentQuestion + 1);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTransitionState('entering-next');
        setVisible(false);
        setTimeout(() => setTransitionState('idle'), 300);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setTransitionState('exiting-previous');
      console.log('Transition: exiting-previous to question', currentQuestion - 1);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setTransitionState('entering-previous');
        setVisible(false);
        setTimeout(() => setTransitionState('idle'), 300);
      }, 300);
    }
  };

  const handleSubmit = () => {
    const unansweredCount = shuffledQuestions.length - Object.keys(answers).length;
    console.log('Unanswered Count:', unansweredCount);
    if (unansweredCount >= 5) {
      setShowUnansweredWarning(true);
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = (confirm) => {
    setShowConfirmation(false);
    if (confirm) {
      setShowResults(true);
    } else {
      setCurrentQuestion(0);
      setTransitionState('entering-next');
      setVisible(true);
      setTimeout(() => setTransitionState('idle'), 700);
    }
  };

  const calculateScore = () => {
    return shuffledQuestions.reduce((score, q) => {
      return answers[q.id] === q.correct ? score + 1 : score;
    }, 0);
  };

  const getTransform = () => {
    if (transitionState === 'exiting-next') return 'translate-x-32 opacity-0';
    if (transitionState === 'exiting-previous') return '-translate-x-32 opacity-0';
    if (transitionState === 'entering-next') return '-translate-x-32 opacity-0';
    if (transitionState === 'entering-previous') return 'translate-x-32 opacity-0';
    return visible ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0';
  };

  const handleRestart = () => {
    const currentSet = getCurrentQuestionSet();
    const shuffled = shuffleArray(currentSet).map((question) => ({
      ...question,
      options: shuffleArray([...question.options]),
    }));
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTransitionState('entering-next');
    setVisible(true);
    setTimeout(() => setTransitionState('idle'), 700);
  };

  return (
    <section>
      <div className="bg-[#666666] pt-40 pb-8 overflow-x-hidden min-h-screen">
        <div className="mb-10 px-4">
          <h1 className="text-white text-4xl font-bold text-center">
            Daily Islamic Quiz
          </h1>
        </div>

        {!showResults ? (
          <div className="max-w-2xl mx-auto px-4">
            {showUnansweredWarning && (
              <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-4 text-center">
                Please go back and answer more questions before submitting.
                <button
                  onClick={() => setShowUnansweredWarning(false)}
                  className="ml-4 bg-[#1062f2] hover:bg-[#1447E6] text-white py-1 px-3 rounded-sm"
                >
                  OK
                </button>
              </div>
            )}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                  <p className="text-lg font-semibold mb-4">Are you sure you want to submit your answers?</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleConfirmSubmit(true)}
                      className="bg-[#004c3f] hover:bg-[#007A55] text-white py-2 px-5 rounded-sm"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleConfirmSubmit(false)}
                      className="bg-[#EFB337] hover:bg-[#ef9f37] text-white py-2 px-5 rounded-sm"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            {shuffledQuestions.length > 0 && (
              <div
                ref={questionRef}
                data-key={shuffledQuestions[currentQuestion].id}
                className={`bg-white rounded-2xl p-7 flex flex-col justify-between h-full min-h-[300px]
                  transform transition-all ease-out duration-700 will-change-transform
                  ${getTransform()}`}
              >
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Question {currentQuestion + 1}: {shuffledQuestions[currentQuestion].text}
                  </h2>
                  <div className="space-y-3">
                    {shuffledQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(shuffledQuestions[currentQuestion].id, option)}
                        className={`w-full text-left p-3 rounded-sm border border-gray-300
                          ${answers[shuffledQuestions[currentQuestion].id] === option
                            ? 'bg-[#004c3f] text-white'
                            : 'bg-white hover:bg-gray-100'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-6 justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className={`py-2 px-5 rounded-sm text-white
                      ${currentQuestion === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#004c3f] hover:bg-[#007A55]'}`}
                  >
                    Previous
                  </button>
                  {currentQuestion === shuffledQuestions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      className="bg-[#004c3f] hover:bg-[#007A55] text-white py-2 px-5 rounded-sm"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="bg-[#004c3f] hover:bg-[#007A55] text-white py-2 px-5 rounded-sm"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-7">
              <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
              <p className="text-lg mb-4">
                Your Score: {calculateScore()} / {shuffledQuestions.length}
              </p>
              <h3 className="text-xl font-bold mb-2">Correct Answers:</h3>
              <ul className="space-y-4">
                {shuffledQuestions.map((q, index) => (
                  <li key={q.id}>
                    <p className="font-semibold">
                      Q{index + 1}: {q.text}
                    </p>
                    <p>
                      Correct Answer: <span className="text-[#069766]">{q.correct}</span>
                    </p>
                    <p>
                      Your Answer: <span className={answers[q.id] === q.correct ? 'text-[#069766]' : 'text-red-500'}>
                        {answers[q.id] || 'Not answered'}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleRestart}
                className="mt-6 bg-[#004c3f] hover:bg-[#007A55] text-white py-2 px-5 rounded-sm"
              >
                Restart Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Quiz;