// // Bir sayının 3'e ve 7'ye tam bölünüp bölünmediğini kontrol eden bir fonksiyon yazın.
// function Bolme(n){
//      if(n % 3 == 0 && n % 7 == 0){
        
//                 return "3'e ve 7'ye tam bölünür";
//             }
//     else{
//         return "3'e ve 7'ye tam bölünmez";
//     }
// }
// console.log(Bolme(21)); // 3'e ve 7'ye tam bölünür


//Verilmis n ve m (n<m) ededleri arasindaki tek ededlerin sayini tapin.
// function TekEdedler(n, m) {
//     let say = 0;
//     for (let i = n; i <= m; i++) {
//         if (i % 2 !== 0) {
//             say++;
//         }
//     }
//     return say;
// }

// console.log(TekEdedler(3, 9)); 

//Verilmis n ve m (n<m) ededleri arasindaki tek ededlerin cemini tapin.
//  function TekEdedlerCemi(n, m) {
//     sum = 0;
//     for (let i = n; i <= m; i++) {
//         if (i % 2 !== 0) {
//             sum += i;
//         }
//     }
//     return sum;
//  }
// console.log(TekEdedlerCemi(3, 5));

//Verilmis n tam ededinin sade ve ya murekkeb oldugunu tapin.
// function SadəVəYaMürəkkəb(n) {
//     if (n <= 1) {
//         return "Sade ededdir.";
//     }
//     for (let i = 2; i <= Math.sqrt(n); i++) {
//         if (n % i === 0) {
//             return "Murekkeb ededdir";
//         }
//     }
//     return "Sade ededdir";
// }

//Verilmish arrayin icindeki cut ededlerin cemini tapin.
// function CutEdedlerCemi(arr) {
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] % 2 === 0) {
//             sum += arr[i];
//         }
//     }
//     return sum;
// }
// console.log(CutEdedlerCemi([1, 2, 3, 4, 5, 6])); 

//Her hansisa number elementleri olan arayin icindeki cut ededlerin kvadratlarinin cemini hesablayan bir function yazin.
// function CutEdedlerKvadratCemi(arr) {
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         if ( arr[i] % 2 === 0) {
//             sum += arr[i] * arr[i];
//         }
//     }
//     return sum;
// }
// console.log(CutEdedlerKvadratCemi([1, 2, 3, 4,5]));

// Elə bir funksiya yazın ki 2 parametr qəbul eləsin - hər 2 parametrin rəqəm olub-olmamağını 
// yoxlamalısınız - əgər hər 2si də rəqəmdirsə yazdığınız funksiya həmin 2 rəqəm arasındakı ədədlərin cəmini 
// return etməlidir (misal üçün parametrlər 10 və 15dirsə 10,11,12,13,14,15 cəmini qaytarmalıdır

// function EdedlerCemi(a, b) 
// {
//     if (typeof a !== 'number' || typeof b !== 'number') {
//         return "Hər iki parametr rəqəm olmalıdır.";
//     }
//     let sum = 0;
//     for (let i = a; i <= b; i++) {
//         sum += i;
//     }
//     return sum;
// }
// console.log(EdedlerCemi(10, "salam"));

// Bir class yaradirsiz ve o classin icerisinde plus, minus, multiply, divide functionlari olur.    
//      var result = new CustomMatch(50).plus(6).minus(30).multiply(3).divide(2)
//          resultin neticesi bu yazilisa gore 50+6-30*3/2 mentiqi ile (riyazi prinsibi unudun,vurma
//              bolme onceliyine ehtiyac yoxdu) 39 olmalidi
// class CustomMatch {
//     constructor(value) {
//         this.value = value;
//     }

//     plus(num) {
//         this.value += num;
//         return this;
//     }

//     minus(num) {
//         this.value -= num;
//         return this;
//     }

//     multiply(num) {
//         this.value *= num;
//         return this;
//     }

//     divide(num) {
//         this.value /= num;
//         return this;
//     }

//     getResult() {
//         return this.value;
//     }
// }
// var result = new CustomMatch(50).plus(6).minus(30).multiply(3).divide(2);
// console.log(result.getResult()); // 39

// ["Yanvar","Fevral","Mart","Aprel"]  - bu arrayi parametr kimi qebul eden bir function yazirsiz.
// Hemin function geriye yeni bir array qaytarir. Yeni yaranan arrayda hemin aylarin necenci ay oldugu yazilmalidir.
//  Cavab bele olmlalidir: ["Yanvar -1","Fevral-2","Mart-3","Aprel-4"]. 
//  function AylarVeNomreleri(arr){
//     let newArr = [];
//     for(let i = 0; i < arr.length; i++){
//         newArr.push(arr[i] + " - " + (i + 1));
//     }
//     return newArr;

//  }
//     console.log(AylarVeNomreleri(["Yanvar","Fevral","Mart","Aprel"]));

// String qebul eden bir function yaziriq. Hemin function yeni bir array qaytaracaq, hemin arrayin elementleri functiona 
// gelen stringin sozlerinin herflerinin sayina beraber olmalidir.
// function SozHerfleriSayi(str) {
//     let words = str.split(" ");
//     let result = [];
//     for (let i = 0; i < words.length; i++) {
//         result.push(words[i].length);
//     }
//     return result;
// }
// console.log(SozHerfleriSayi("salam"));







