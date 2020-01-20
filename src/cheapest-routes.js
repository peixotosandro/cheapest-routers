/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { get } from 'request';
import { createInterface } from 'readline';

function ask(question, callback) {
  const appInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  appInterface.question(`${question} `, answer => {
    appInterface.close();
    callback(answer);
  });
}

function prompt() {
  ask('\nPlease enter the route (DEPARTURE-ARRIVAL):', answer => {
    if (answer.length === 0) {
      prompt();
      return;
    }

    get(
      `http://localhost:9000/v1/routes/cheapest/${answer}`,
      (err, response, body) => {
        if (err) {
          return console.log('Service is not available.');
        }

        const result = JSON.parse(body);
        const { error } = result;

        if (!error) {
          let resultFormated = '\n';
          resultFormated += result.route.reduce((prevVal, elem) => {
            let resultElem = elem;
            if (prevVal.length > 0) {
              resultElem = `${prevVal} - ${elem}`;
            }
            return resultElem;
          });
          resultFormated += ` > $${result.price}`;

          console.log(resultFormated);
        } else {
          console.log(error);
        }

        prompt();
      }
    );
  });
}

prompt();
