const setName = (name) => {
  localStorage.setItem('name', JSON.stringify(name));
};

const getName = () => {
  const result = JSON.parse(localStorage.getItem('name'));
  return result;
};

const getLocalScores = () => {
  const score = localStorage.getItem('scores');
  let result = JSON.parse(score);
  if (result === null) {
    result = 0;
    localStorage.setItem('scores', JSON.stringify(result));
  }
  return result;
};

const setLocalScores = (score) => {
  localStorage.setItem('scores', JSON.stringify(score));
};

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
  getLocalScores, setLocalScores, getMusic, setMusic, setSound, getSound, setName, getName,
};