// Karaoke com pausa, retomada, parada, pontuação por porcentagem de acerto e porcentagem total da música

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const stopBtn = document.getElementById("stop");
const resultDiv = document.getElementById("result");

let recognition;
let transcript = "";
let fullTranscript = "";
let listening = false;
let paused = false;

// Letra de Bohemian Rhapsody
const lyrics = [
  "Is this the real life?",
  "Is this just fantasy?",
  "Caught in a landslide",
  "No escape from reality",
  "Open your eyes",
  "Look up to the skies and see",
  "I'm just a poor boy",
  "I need no sympathy",
  "Because I'm easy come, easy go",
  "Little high, little low",
  "Anyway the wind blows",
  "Doesn't really matter to me",
  "To me",
  "Mama, just killed a man",
  "Put a gun against his head",
  "Pulled my trigger, now he's dead",
  "Mama, life had just begun",
  "But now I've gone and thrown it all away",
  "Mama! Ooh!",
  "Didn't mean to make you cry",
  "If I'm not back again this time tomorrow",
  "Carry on, carry on",
  "As if nothing really matters",
  "Too late, my time has come",
  "Sends shivers down my spine",
  "Body's aching all the time",
  "Goodbye, everybody",
  "I've got to go",
  "Gotta leave you all behind",
  "And face the truth",
  "Mama! Ooh!",
  "(Anyway the wind blows)",
  "I don't wanna die",
  "I sometimes wish I'd never been born at all",
  "I see a little silhouetto of a man",
  "Scaramouche! Scaramouche!",
  "Will you do the fandango?",
  "Thunderbolt and lightning",
  "Very, very frightening me!",
  "Galileo! Galileo!",
  "Galileo! Galileo!",
  "Galileo, Figaro!",
  "Magnifico!",
  "I'm just a poor boy and nobody loves me",
  "(He's just a poor boy from a poor family)",
  "(Spare him his life, from this monstrosity)",
  "Easy come, easy go",
  "Will you let me go?",
  "Bismillah!",
  "No, we will not let you go!",
  "(Let him go!)",
  "Bismillah!",
  "We will not let you go!",
  "(Let him go!)",
  "Bismillah!",
  "We will not let you go!",
  "(Let me go!)",
  "Will not let you go!",
  "(Let me go!)",
  "Never, never let you go!",
  "Never, never, never let me go!",
  "No, no, no, no, no, no, no!",
  "Oh, mamma mia, mamma mia!",
  "Mamma mia, let me go!",
  "Beelzebub has a devil put aside for me!",
  "For me!",
  "For me!",
  "So you think you can stone me and spit in my eye?",
  "So you think you can love me and leave me to die?",
  "Oh, baby!",
  "Can't do this to me, baby!",
  "Just gotta get out",
  "Just gotta get right outta here!",
  "Oh, yeah!",
  "Oh, yeah!",
  "Nothing really matters",
  "Anyone can see",
  "Nothing really matters",
  "Nothing really matters to me",
  "Anyway the wind blows"
];

// Porcentagem mínima de acerto para pontuar (ex: 0.8 = 80%)
const MIN_PERCENT_CORRECT = 0.8;

// Função para pontuação por porcentagem por verso e mostra porcentagem total
function calcScore(transcript, lyrics) {
  const transcriptWords = transcript.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/);
  let score = 0;
  let versosAcertados = [];
  lyrics.forEach((line) => {
    const lineWords = line.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/);
    let matched = 0;
    lineWords.forEach(word => {
      if (word && transcriptWords.includes(word)) matched++;
    });
    const percentMatched = matched / lineWords.length;
    // Só conta se matched > 0 e percentMatched >= MIN_PERCENT_CORRECT
    if (matched > 0 && percentMatched >= MIN_PERCENT_CORRECT) {
      score++;
      versosAcertados.push(`${line} (${Math.round(percentMatched*100)}%)`);
    }
  });
  return { score, versosAcertados };
}

// Inicia reconhecimento
startBtn.onclick = () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    resultDiv.innerText = "Seu navegador não suporta reconhecimento de voz!";
    return;
  }

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;
  stopBtn.disabled = false;
  resultDiv.innerText = "Reconhecendo... cante agora!";
  transcript = "";
  fullTranscript = "";
  listening = true;
  paused = false;

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US"; // Troque para "pt-BR" se for português
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal)
        transcript += event.results[i][0].transcript + " ";
      else
        interimTranscript += event.results[i][0].transcript;
    }
    resultDiv.innerHTML = `Reconhecendo: ${fullTranscript + transcript} <br><i>${interimTranscript}</i>`;
  };

  recognition.onerror = (event) => {
    resultDiv.innerText = "Erro: " + event.error;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    stopBtn.disabled = true;
    listening = false;
  };

  recognition.onend = () => {
    if (!paused) {
      resultDiv.innerHTML += "<br><b>Reconhecimento finalizado!</b>";
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resumeBtn.disabled = true;
      stopBtn.disabled = true;
      listening = false;
    }
  };

  recognition.start();
};

// Pausa reconhecimento
pauseBtn.onclick = () => {
  if (recognition && listening) {
    recognition.stop();
    fullTranscript += transcript + " ";
    transcript = "";
    paused = true;
    listening = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
    resultDiv.innerHTML += "<br><b>Pausado.</b>";
  }
};

// Retoma reconhecimento
resumeBtn.onclick = () => {
  if (!listening && paused) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Troque para "pt-BR" se for português
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal)
          transcript += event.results[i][0].transcript + " ";
        else
          interimTranscript += event.results[i][0].transcript;
      }
      resultDiv.innerHTML = `Reconhecendo: ${fullTranscript + transcript} <br><i>${interimTranscript}</i>`;
    };

    recognition.onerror = (event) => {
      resultDiv.innerText = "Erro: " + event.error;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resumeBtn.disabled = true;
      stopBtn.disabled = true;
      listening = false;
    };

    recognition.onend = () => {
      if (!paused) {
        resultDiv.innerHTML += "<br><b>Reconhecimento finalizado!</b>";
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resumeBtn.disabled = true;
        stopBtn.disabled = true;
        listening = false;
      }
    };

    recognition.start();
    listening = true;
    paused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    resultDiv.innerHTML += "<br><b>Retomado.</b>";
  }
};

// Para reconhecimento e mostra pontuação e porcentagem total
stopBtn.onclick = () => {
  if ((recognition && listening) || paused) {
    if (recognition && listening) {
      recognition.stop();
      fullTranscript += transcript + " ";
    }
    listening = false;
    paused = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    stopBtn.disabled = true;
    startBtn.disabled = false;

    // Validação: verifica se há transcrição
    const transcriptFinal = fullTranscript.trim();
    if (!transcriptFinal) {
      resultDiv.innerHTML += `<br><b>Nenhum áudio foi reconhecido. Tente novamente!</b>`;
      return;
    }

    // Calcula pontuação só do que foi cantado
    const { score, versosAcertados } = calcScore(transcriptFinal, lyrics);
    const totalVersos = lyrics.length;
    const percentTotal = ((score / totalVersos) * 100).toFixed(1);
    resultDiv.innerHTML += `<br><b>Pontuação:</b> ${score} de ${totalVersos} versos`;
    resultDiv.innerHTML += `<br><b>Porcentagem da música acertada:</b> ${percentTotal}%`;
    if (versosAcertados.length > 0) {
      resultDiv.innerHTML += `<br><b>Versos acertados:</b><ul>${versosAcertados.map(v => `<li>${v}</li>`).join('')}</ul>`;
    }
    resultDiv.innerHTML += `<br><b>Letra reconhecida:</b> ${transcriptFinal}`;
  } else {
    resultDiv.innerHTML += `<br><b>Você precisa começar o reconhecimento antes de parar!</b>`;
  }
};
