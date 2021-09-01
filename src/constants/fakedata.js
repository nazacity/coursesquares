export const user = {
  image:
    'https://i.pinimg.com/originals/68/75/0d/68750de880f7d7c47961490c18c58e5a.jpg',
  firstName: 'Course',
  lastName: 'Square',
  email: 'som.sanga@gmail.com',
};

var date = new Date();

export const courses = [
  {
    id: '1',
    title: 'Whatever course',
    author: 'นันทิกานต์ ประสงค์ทบ',
    expiriedDate: date.setDate(date.getDate() + 7),
    percentage: 30,
    image:
      'https://www.classcentral.com/report/wp-content/uploads/2020/06/top-100-course-pandemic.png',
    totalMins: 89,
    price: '1500',
    category: ['ภาษา', 'คนทำงาน'],
  },
  {
    id: '2',
    title: 'Whatever course',
    author: 'วุฒิพงศ์ นิ่มอ่อน',
    expiriedDate: date.setDate(date.getDate() + 15),
    percentage: 54,
    image:
      'https://www.classcentral.com/report/wp-content/uploads/2020/04/learn-for-free-coronavirus-1024x512.png',
    totalMins: 120,
    totalMins: 89,
    price: '1800',
    category: ['เตรียมสอบ', 'เนื้อหาในห้องเรียน'],
  },
  {
    id: '3',
    title: 'ภาษาอังกฤษในชีวิตประจำวัน',
    author: 'ชไมพร แสงจันทร์',
    expiriedDate: date.setDate(date.getDate() + 35),
    percentage: 65,
    image:
      'https://image.freepik.com/free-vector/flat-landing-page-template-book-library_9209-1914.jpg',
    totalMins: 120,
    price: '1400',
    category: ['ธุรกิจและการทำงาน', 'ไลท์สไตส์'],
  },
  {
    id: '4',
    title: 'ภาษาญี่ปุ่นเบื้องต้น',
    author: 'あおい',
    expiriedDate: date.setDate(date.getDate() + 25),
    percentage: 95,
    image:
      'https://thumbs.dreamstime.com/z/student-studying-internet-vector-web-concept-distance-learning-system-e-learning-easy-to-use-website-banner-landing-142267635.jpg',
    totalMins: 120,
    price: '2500',
    category: ['ไอทีและซอร์ฟแวร์', 'ภาษา'],
  },
];

export const expiriedCourses = [
  {
    id: '1',
    title: 'ภาษาอังกฤษในชีวิตประจำวัน',
    author: 'ชไมพร แสงจันทร์',
    expiriedDate: date.setDate(date.getDate() - 21),
    percentage: 65,
    image: 'https://pgim.cmb.ac.lk/wp-content/uploads/2020/03/learn.png',
    totalMins: 78,
    leftVideos: 8,
  },
  {
    id: '2',
    title: 'การขับร้องเพลงสากล',
    author: 'あおい',
    expiriedDate: date.setDate(date.getDate() + 20),
    percentage: 75,
    image:
      'https://www.classcentral.com/report/wp-content/uploads/2020/04/learn-for-free-coronavirus-1024x512.png',
    totalMins: 114,
    leftVideos: 4,
  },
];

export const course = {
  title: 'Photoshop CC 2014 For Photographer',
  image:
    'https://www.classcentral.com/report/wp-content/uploads/2020/04/learn-for-free-coronavirus-1024x512.png',
  author: {
    name: 'วุฒิพงศ์ นิ่มอ่อน',
    sub: 'TN masterclass',
    description: 'Software Developer ที่บริษัทสยามชำนาญกิจ กลุ่ม SPRINT3R',
    image:
      'https://static.jobscan.co/blog/uploads/jobs-for-former-teachers.png',
  },
  totalMins: 505,
  expiriedDate: date.setDate(date.getDate() + 13),
  about:
    'คอร์ส  การหายใจ และ เปล่งเสียง ร้องเพลงให้เก่งขึ่นได้อย่างไรคอร์สนี้เป็น ( Hard skills )',
  suit: 'ที่เหมาะกับทุกคนที่ต้องการเข้าใจและสามารถ หายใจ และเปล่งเสียงในการร้องเพลง',
  skill:
    'เมื่อได้เรียนคอร์สนี้และจะเข้าใจพื้นฐาน เทคนิค วิธีคิด หลักปฏิบัตืต่างที่จะทำให้ทุกคนร้องเพลงได้ดีขึ้น',
  lessons: [
    {
      id: '1',
      title: 'อิ่มแปร้ ใช้งานทอร์นา...',
      time: 30,
    },
    {
      id: '2',
      title: 'รายชื่อลอร์ดบูม แอป...',
      time: 13,
    },
    {
      id: '3',
      title: 'อ่อนด้อยวานิลลา วีซ่า ...',
      time: 18,
    },
    {
      id: '4',
      title: 'สตรอเบอรีฉลุยโปรดัก...',
      time: 20,
    },
    {
      id: '5',
      title: 'ติ๋มวิดีโอเยลลี่แหม็บ ...',
      time: 14,
    },
  ],
  documents: [
    {
      id: '1',
      title: 'เอกสาร 1',
    },
    {
      id: '2',
      title: 'เอกสาร 2',
    },
    {
      id: '3',
      title: 'เอกสาร 3',
    },
    {
      id: '4',
      title: 'เอกสาร 4',
    },
    {
      id: '5',
      title: 'เอกสาร 5',
    },
  ],
};

export const categories = [
  {
    id: '1',
    title: 'เตรียมสอบ',
  },
  {
    id: '2',
    title: 'เนื้อหาในห้องเรียน',
  },
  {
    id: '3',
    title: 'ภาษา',
  },
  {
    id: '4',
    title: 'ไอทีและซอร์ฟแวร์',
  },
  {
    id: '5',
    title: 'ธุรกิจและการทำงาน',
  },
  {
    id: '6',
    title: 'ไลฟ์สไตล์',
  },
];
