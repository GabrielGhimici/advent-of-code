import { readdirSync } from 'fs';

enum ListContext {
  Years = 'year_directories',
  Days = 'days_in_current_year_directory',
}

function listItems(path: string, context: ListContext = ListContext.Years) {
  return readdirSync(path, { withFileTypes: true })
    .filter((dirent) => {
      if (context === ListContext.Years) {
        return dirent.isDirectory() && dirent.name.match(/\d/);
      }
      if (context === ListContext.Days) {
        return dirent.isFile() && dirent.name.startsWith('day') && !dirent.name.endsWith('.map');
      }
      return true;
    })
    .map((dirent) => dirent.name);
}

export { listItems, ListContext };
