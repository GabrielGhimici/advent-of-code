import prompts from 'prompts';

import { ListContext, listItems } from './core/list-items';

import * as _2021 from './2021';

const years: Record<string, Record<string, Record<string, any>>> = {
  '2021': _2021,
};

//prompts.override({ year: 2021, day: 'day_1', dayFunction: ['measurementIncreases', 'groupedMeasurementIncreases'] });

async function getAnswers(): Promise<{ year: string; day: string; dayFunction: Array<string> }> {
  const yearDirs = listItems(`${__dirname}`);
  const { year } = await prompts({
    type: 'autocomplete',
    name: 'year',
    message: 'Pick target year',
    choices: yearDirs.map((year) => ({ title: `Year-${year}`, value: year })),
  });

  const days = listItems(`${__dirname}/${year}`, ListContext.Days);
  const { day } = await prompts({
    type: 'autocomplete',
    name: 'day',
    message: 'Pick target day',
    choices: days.map((day) => {
      const dayWithoutExtension = day.replace('.js', '');
      const label = dayWithoutExtension.split('-').map((value: string) => {
        if (!value.match(/\d/)) {
          return `${value.charAt(0).toUpperCase()}${value.substring(1)}`;
        }
        return value;
      });
      return { title: label.join(' '), value: dayWithoutExtension.replace('-', '_') };
    }),
  });

  const { dayFunction } = await prompts({
    type: 'multiselect',
    name: 'dayFunction',
    message: 'Which function do you want to run?',
    choices: Object.keys(years[year][day]).map((fn) => ({ title: fn, value: fn })),
    hint: '- Space to select. Return to submit',
  });

  return { year, day, dayFunction };
}

async function runMenu() {
  const { year, day, dayFunction } = await getAnswers();
  console.log('\n+--Displaying data for %s from year %s', day, year);
  const values = await Promise.all(
    dayFunction.map((fn) => years[year][day][fn]().then((value: unknown) => ({ fn, value })))
  );
  values.forEach(({ fn, value }) => {
    console.log('+- %s: %s', fn, value);
  });
  console.log('+----------------------------------------------------------------\n');
}

(async () => {
  let running = true;
  while (running) {
    await runMenu();
    const { restart } = await prompts({
      type: 'confirm',
      name: 'restart',
      message: 'Do you want to try another day?',
      initial: true,
    });
    running = restart;
  }
  console.log('\nProgram existed successfully...');
})();
