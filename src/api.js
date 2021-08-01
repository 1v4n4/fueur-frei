// eslint-disable-next-line
const createGame = async () => {
  try {
    const game = { name: 'Fueur Frei! - Retro Space Shooter' };
    const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    const response = await fetch(endPoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),

    });

    const answer = await response.json();
    return answer;
  } catch (error) {
    console.error(error);
    alert('Ouch');
  }
};
// eslint-disable-next-line
const setApiScore = async (userName, userScore) => {
  try {
    const submitData = {
      user: userName,
      score: userScore,
    };
    const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/txsLyD8FoM4t98NdPTnD/scores/';

    const response = await fetch(endPoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });

    const answer = await response.json();
    return answer;
  } catch (error) {
    console.error(error);
    alert('Ouch, something went wrong!');
  }
};
// eslint-disable-next-line
const getApiScores = async () => {
  try {
    const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/txsLyD8FoM4t98NdPTnD/scores/';
    const response = await fetch(endPoint, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const answer = await response.json();

    answer.result.sort((a, b) => b.score - a.score);

    const arr = answer.result;
    let data = [];
    if (arr.length > 10) {
      data = arr.slice(0, 10);
    } else { data = arr; }
    return data;
  } catch (error) {
    console.error(error);
    alert('Ouch, something went wrong!');
  }
};

const getApiScoress = async () => {
  const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/txsLyD8FoM4t98NdPTnD/scores/';
  const response = await fetch(endPoint, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const answer = await response.json();

  return answer;
};

export { setApiScore, getApiScores, getApiScoress };