// leters Areay
const letters = "أاآبتثجحخدذرزسشصضطظعغفقكلمنهوىيةءؤ";
let lettersAreay = Array.from(letters);
let contLeter = document.querySelector(".letters");
lettersAreay.forEach((leter) => {
  // عمل سبان لكل حرف
  let span = document.createElement("span");
  span.className = "letter-Box";
  // إضافة الحروف داخلها
  let text = document.createTextNode(leter);
  span.appendChild(text);
  // إضافة الأزرار كلها للصفحة
  contLeter.appendChild(span);
});

// object للكلمات المقترحة كلها

const words = {
  "سور القرآن": [
    "البقرة",
    "آل عمران",
    "يس",
    "الصافات",
    "ص",
    "ق",
    "الزمر",
    "الكهف",
    "مريم",
    "المؤمنون",
    "النازعات",
    "عبس",
    "النور",
    "غافر",
    "الحديد",
    "الرحمن",
  ],
  الصحابة: [
    "أبو بكر الصديق",
    "عمر بن الخطاب",
    "علي بن أبي طالب",
    "أبو عبيدة",
    "عبد الله بن الزبير",
    "زيد بن ثابث",
    "عبد الرحمن بن عوف",
    "بلال بن رباح",
    "زيد الخير",
    "عمرو بن العاص",
    "الزبير بن العوام",
    "عبد الله بن الزبير",
    "عبد الله بن عمر",
    "عبد الله بن مسعود",
    "عبد الله بن عمرو",
    "البراء بن مالك",
    "أنس بن مالك",
  ],
  البلاد: [
    "مصر",
    "المغرب",
    "تونس",
    "السعودية",
    "السودان",
    "اليابان",
    "موريتانيا",
    "ليبيا",
    "فلسطين",
    "الأردن",
    "العراق",
    "اليمن",
    "الجزائر",
    "قطر",
  ],
};

// Radom Word
let allKeys = Object.keys(words);
let randomnum1 = Math.floor(Math.random() * allKeys.length);
let randomType = allKeys[randomnum1];
let randomValue = words[randomType];
let randomnum2 = Math.floor(Math.random() * randomValue.length);
let value = randomValue[randomnum2];
console.log(value); ////////////////////////////////////////////////////////////////

// Type Info
document.querySelector(".game-info .type span").innerHTML = randomType;

// leters-guess iput Box
let inputCont = document.querySelector(".leters-guess");
// عمل قايمة فيها كل حروف الكلمة العشواءية بالترتيب
let leterAndSpace = Array.from(value);
//
leterAndSpace.forEach((lete) => {
  // متغير للمسافات داخل الكلمة العشواءية
  let empty = document.createElement("span");
  // لو في مسافة في الكلمة نضيف لها كلاس المسافة
  if (lete === " ") {
    empty.className = "space";
  }
  //
  inputCont.appendChild(empty);
});

//
let inputs = document.querySelectorAll(".leters-guess span");
// متغير عدد المحاولات الخطأ ويبدأ من صفر
let tryWrong = 0;
// اختيار رسمه الرجل للتحكم فيها
let Drow = document.querySelector(".hangman-row");

// عملية الضغط على الحرف والتحقق من وجوده في الكلمة أو لا
document.addEventListener("click", (e) => {
  // حالة التحقق من الكلمة إذا كانت صح أو خطأ
  let thestatus = false;
  if (e.target.className === "letter-Box") {
    // لو الحرف تم الضغط عليه نضيف له كلاس تم عشان يمنع الضغط عليه تاني
    e.target.classList.add("cliked");
    // متغير فيه قيمة الحرف الذي تم الضغط عليه
    let theclicked = e.target.innerHTML;
    // لوب علي القايمة التى فيها كل حروف الكلمة العشواءية
    leterAndSpace.forEach((e, indexe) => {
      // نقارن الحرف الذي تم الضغط عليه مع كل حروف الكلمة العشواءية
      if (theclicked === e) {
        // لو الحرف الذي تم الضغط عليه موجود فى الكلمة نعمل الحالة صح
        thestatus = true;
        // ثم نعمل لوب علي كل المدخلات عشان نقارن كل حرف بالمكان ونعرف مكانه الصحيح
        inputs.forEach((span, indexS) => {
          // او ما يتطابق مكان الحرف الذي فى الكلمة العشواءية مع مكانه فى حقل الإدخال يتم إدخاله تلقاءياً
          if (indexe === indexS) {
            span.innerHTML = theclicked;
          }
        });
      }
    });
    // في حالة اختيار حرف خطأ
    if (thestatus !== true) {
      // زيادة عدد الأخطاء أولاً
      tryWrong++;
      // إضافة كلاس خطأ على العنصر لأب كل مرة تخطىء فيها
      Drow.classList.add(`try-${tryWrong}`);
      // إضافة صوت الخطأ
      document.querySelector(".fil").play();
      if (tryWrong === 8) {
        contLeter.classList.add("finsh");
        endGame();
      }
    } else {
      // إضافة صوت النجاح
      document.querySelector(".ses").play();
    }
  }
});
//
function endGame() {
  document.querySelector(".end").classList.add("play");
  document.querySelector("p").classList.add("play");
  document.querySelector("a").classList.add("play");
  document.querySelector(".end .w").play();
}

let cick = document.querySelector(".cick");
cick.addEventListener("click", checkWin);

function checkWin() {
  const allFilled = Array.from(inputs).every(
    (span) => span.innerHTML !== "" || span.classList.contains("space")
  );
  if (allFilled) {
    // إظهار شاشة الفوز، تشغيل صوت، تعطيل النقرات
    document.querySelector(".bob").classList.add("play");
    document.querySelector(".word").innerHTML = `الكلمة كانت ⏪ ${value}`;
    document.querySelector(".win").play();
  }
}
