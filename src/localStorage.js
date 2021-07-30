function setScore(score) { //localStoreScore
  const scr = JSON.stringify(score);
  localStorage.setItem('scores', scr);
}

function getLocal() { //getLocalScores
  const score = localStorage.getItem('scores');
  let result = JSON.parse(score);
  if (result === null) {
    result = [0, 0];
    localScore(result);
  }
  return result;
}

function storeScores(score) {
  const localScore = getLocalScores();
  localScore[0] = score;
  localScore[1] = Math.max(...localScore);
  localScore(localScore);
}


const setMusic = (value) => {
  const msc = JSON.stringify(value);
  localStorage.setItem('music', msc);
}

const getMusic = () => {

    const music = localStorage.getItem('music');
    let result = JSON.parse(music);
    if (result === null) {
      result = true;
      localStoreScore(result[0]);
    }
    return result;
}

const setSound = (value) => {
  const snd = JSON.stringify(value);
  localStorage.setItem('sound', snd);
  console.log(value);
}

const getSound = () => {

    const sound = localStorage.getItem('sound');
    let result = JSON.parse(sound);
    if (result === null) {
      result = true;
      localStoreScore(result[0]);
    }
    return result;
}

export { setScore, getLocal, storeScores, getMusic, setMusic, setSound, getSound };