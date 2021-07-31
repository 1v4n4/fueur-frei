function getLocalScores() {
  const score = localStorage.getItem('scores');
  let result = JSON.parse(score);
  if (result === null) {
    result = [0, 0];
    localStorage.setItem('scores', JSON.stringify(result));
  }
  return result;
}

function setLocalScores(score) {
  const localScore = getLocalScores();
  localScore[0] = score;
  localScore[1] = Math.max(...localScore);
  localStorage.setItem('scores', JSON.stringify(localScore));
}

const setMusic = (value) => {
  const msc = JSON.stringify(value);
  localStorage.setItem('music', msc);
};

const getMusic = () => {
  const music = localStorage.getItem('music');
  let result = JSON.parse(music);
  if (result === null) {
    result = true;
  }
  return result;
};

const setSound = (value) => {
  const snd = JSON.stringify(value);
  localStorage.setItem('sound', snd);
  console.log(value);
};

const getSound = () => {
  const sound = localStorage.getItem('sound');
  let result = JSON.parse(sound);
  if (result === null) {
    result = true;
  }
  return result;
};

export {
  getLocalScores, setLocalScores, getMusic, setMusic, setSound, getSound,
};