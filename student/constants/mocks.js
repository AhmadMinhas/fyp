const categories = [
  {
    id: "1",
    department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    subject:"OOP",
    semester:"2",
    description:"chapter 1",
    regnum:"FA16-BCS-054",
    Price:"Rs 150",
    username: "ayishm",
    comments:"you are right",
    image: require("../assets/images/pro.png"),
    images: [
      require("../assets/images/bok1.png"),
      require("../assets/images/bok1.png"),
      require("../assets/images/bok1.png"),
     
      require("../assets/images/bok1.png"),
     
    ],
    contact:"0302-8787966",
    contactNumber:"0302-8787966",
    location:{
      name:"Bahria Town,Lahore",
    latitude:31.3695,
    longitude:74.1768,},
    post:"Hello everyone, i have a problem with administration panel. Kindly guide me the way to apprach admin regarding my courses "
  },
  {
    images: [
      require("../assets/images/carpoool.jpg"),
      require("../assets/images/carpoool.jpg"),
      require("../assets/images/carpoool.jpg"),
     
      require("../assets/images/carpoool.jpg"),
     
    ],
    id: "2",
    department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    subject:"OOP",
    semester:"2",
    description:"chapter 6",
    regnum:"FA16-BCS-232",
    username: "ahmad",
    Price:"Rs 160",
    image: require("../assets/images/bok1.png"),
    post:"Hello everyone, i have a problem with administration panel. Kindly guide me the way to apprach admin regarding my courses "
  },
  {
    id: "3",
    department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    subject:"OOP",
    semester:"2",
    description:"chapter4",
    regnum:"FA19-BCS-056",
    username: "amna",
    Price:"Rs 100",
    image: require("../assets/images/carpoool.jpg"),
    post:"Hello everyone, i have a problem with administration panel. Kindly guide me the way to apprach admin regarding my courses "
  },
  {
    id: "4",
    department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    subject:"OOP",
    semester:"2",
    description:"chapter 7",
    regnum:"FA18-BCS-058",
    username: "ayesha",
    Price:"Rs 180",
    comments:"you are right"
    ,image: require("../assets/images/bok1.png"),
    post:"Hello everyone, i have a problem with administration panel. Kindly guide me the way to apprach admin regarding my courses "
  },
  {
    id: "5",
    department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    subject:"OOP",
    semester:"2",
    description:"chapter 8",
    regnum:"FA17-BCS-543",
    username: "john",
    image: require("../assets/images/pro.png"),
    post:"Hello everyone, i have a problem with administration panel. Kindly guide me the way to apprach admin regarding my courses "
  },
  {
    id: "6",
    department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    subject:"OOP",
    semester:"2",
    description:"chapter 5",
    regnum:"FA16-BCS-123",
    username: "hassan",
    comments:"right",
    image: require("../assets/images/bok1.png"),
    post:"Hello everyone, i have a problem with administration panel. Kindly guide me the way to apprach admin regarding my courses "
  },
  
];



const tutors = [
  {
    Name: "Ayishm",
    Department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    Semester:"8",
    image: require("../assets/images/pro.png"),
    email:"ahmahassan@gmail.com",
    description:"I can teach OOP and Calculus1, Grab the concepts with the easy trocks I'll share with you. Rest for charges and the further details, call me on the number i have shared. "
  },
  {
    Name: "Ahmad",
    Department:"Computer Science",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    Semester:"8",
    image: require("../assets/images/pro.png"),
    email:"ahmahassan@gmail.com",
    description:"I can teach ICT and Electronics, Contact me through this email ahmahassan@gmail.com. "
  },
  {
    Name: "Hassan",
    Department:"Architecture",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    Semester:"6",
    image: require("../assets/images/pro.png"),
    email:"hassan@gmail.com",
    image: require("../assets/images/pro.png"),
    description:"I can teach Art and design, Contact me through this number 0300-1234567"
  },
  {
    Name: "Haris",
    Department:"Physics",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    Semester:"7",
    image: require("../assets/images/pro.png"),
    email:"haris@gmail.com",
    image: require("../assets/images/pro.png"),
    description:"I can teach Mechanics,  contact me through this number 0300-1234567 for further details and to finalize charges"
  },
  {
    Name: "Amna",
    Department:"BBA",
    datetime:"Mon,18 May 2020 11:15:08 GMT",
    Semester:"5",
    email:"amna@gmail.com",
    image: require("../assets/images/pro.png"),
    description:"I can teach Accounts and finance,  contact me through the email i have shared for further details. Thanks",
    
  },
 
  
];
   






const profile = {
  regnum:"FA16-BCS-054",
  email:"FA16-BCS-054@cuilahore.edu.pk",
  username: "ayishm",
  password:"qwerty",
  Semester:"8",
  avatar: require("../assets/images/avatar.png"),
  datetime:"Mon,18 May 2020 11:15:08 GMT",
  notifications: true,
};
const products = [
  {
    id: 1,
    name: "16 Best Plants That Thrive In Your Bedroom",
    description:
      "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
    tags: ["Interior", "27 m²", "Ideas"],
    images: [
      require("../assets/images/bok1.png"),
      require("../assets/images/bok1.png"),
      require("../assets/images/bok1.png"),
     
      require("../assets/images/bok1.png"),
     
    ]
  }];
const options = [
  {
    label: 'News'
  },
  {
    label: 'Design'
  },
  {
    label: 'Sales'
  },
  {
    label: 'Marketing'
  },
  {
    label: 'Customer Success'
  }
];

const departments=[
  {
    label: 'Computer Science'
  },
  {
    label: 'BBA'
  },
  {
    label: 'Architecture department'
  },
  {
    label: 'Physic'
  },
  {
    label: 'Mathematics'
  }
];

const category= [
      {
        loc: "Johar Town"
      },
      {
       loc:"Bahria Town"
      },
      {
        loc: "Izmir Town"
      },
      {
        loc: "Jubilee Town"
      },
      {
        loc: "Defence"
      },
      {
        loc: "Model Town"
      }
    ]

const Semester=[
  {
    label: '1'
  },
  {
    label: '2'
  },
  {
    label: '3'
  },
  {
    label: '4'
  },
  {
    label: '5'
  },
  {
    label: '6'
  },
  {
    label: '7'
  },
  {
    label: '8'
  }
];

const subjects=[
  {
    label: 'English'
  },
  {
    label: 'Pak Studies'
  },
  {
    label: 'Fundamentals of Computer Programming'
  },
  {
    label: 'Design and analysis of Algorithm'
  },
  {
    label: 'Object Oriented Programming'
  }
];



export {products,profile,options,subjects,Semester,departments,category,categories,tutors };
