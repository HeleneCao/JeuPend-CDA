const tabMot = ["Cowboy","Saloon","Western","Cactus","Bandit","Duel","Indien","Revolver","Rodeo","Farwest","Whisky","Colt","Diligence"];
let clavierDiv=document.getElementById("clavier");
let tiretDiv=document.getElementById("tiret");
let essai=document.getElementById("essai");
let image=document.getElementById("image");
let img=document.createElement("img");
let boutonReset=document.getElementById("rejouer")
const motChoisi = motAlea();
let motCache="";
let cpt=0;
let nbrEssai = 7;
let lettreTrouvée = false;

gameInit();
boutonReset.addEventListener("click",reset)

function gameInit(){

  afficherClavier();
  afficherMotCache();
  epureAccent(motChoisi)
  bouttonEvent();

}

function reset(){
  location.reload();
}

function bouttonEvent(){
  boutonAlpha = document.getElementsByClassName("bouton-alpha")
  for (const button of boutonAlpha) {
    button.addEventListener("click", e => {
      inputCheck(e.target.id)
    })
  }
}

function afficherClavier() {
  alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for ( i = 0; i < alpha.length; i++) {
    lettre = alpha.charAt(i);
    clavierDiv.innerHTML += "<button id=" + lettre + "  class=\"bouton-alpha\">" + lettre + "</button>";
  }
}

function inputCheck (value) {
  document.getElementById(value).disabled="true";
  cpt++;
  console.log(motChoisi);
  console.log(motCache);
  console.log(testLettre(value));
  tiretDiv.innerHTML = motCache;
  if(lettreTrouvée===false){
    nbrEssai--;
    essai.innerHTML= "Il vous reste " + nbrEssai + " vies.";
    imagesPendu();
  }
  if (nbrEssai === 0){
    alert("VOUS ETES MORT! Il s'agissait du mot " + motChoisi + "!");
    location.reload();
  }
  if(motTrouve(motCache)){
    alert("BRAVO! VOUS AVEZ GAGNÉ UN IPHONE 14 PRO MAX! Il s'agit bien du mot " + motCache + ".");
    location.reload();
  }
}

function afficherMotCache(){
  for (let i = 0; i < motChoisi.length; i++) {
    tiretDiv.innerHTML += "\-";
    motCache+="\-";
  }
  essai.innerHTML="Il vous reste " +(nbrEssai - cpt)+ " vies."
}

function epureAccent(mot){
  accents="àäâçéèëêïîùüûÿ";
  substit="aaaceeeeiiuuuy";
  resultat="";
  position=0;
  for(i=0;i<mot.length;i++){
    position=accents.indexOf(mot.substring(i,i+1));

    if(position>0){
      resultat+=substit.charAt(position);
    }
    else{
      resultat+=mot.charAt(i);
    }
  }
  return resultat;
}

function occurences(mot,lettre){
  nbOcc=0;
  for(i=0;i<mot.length;i++){
    if(mot.charAt(i)==lettre){
      nbOcc++;
    }

  }
  return nbOcc>1;
}

function motAlea(){
  alea=Math.floor(Math.random() * tabMot.length);
  return tabMot[alea].toUpperCase();
}

function motTrouve(motTrouve){
  return motChoisi===motTrouve
}

function lettreIsIn(lettre){
  return motChoisi.indexOf(lettre)>0;
}

function testLettre(letterSaisie) {
  lettreTrouvée = false;
  saveTmp = "";
  for (var i = 0; i < motChoisi.length; i++) {
    if (motChoisi.charAt(i) === letterSaisie) {
      saveTmp += letterSaisie;
      lettreTrouvée = true;
    }
    else{
      saveTmp += motCache[i];

    }
  }
  motCache=saveTmp;
  return saveTmp;
}

function imagesPendu(){
img.id = 'image';
img.src = "./img/ll"+ nbrEssai+".png";
image.appendChild(img)
}

