import fsExtra from 'fs-extra';
import fs from 'node:fs/promises';
import * as path from 'node:path';
import { renderToString } from 'react-dom/server';

const cwd = process.cwd();
const reactIconsDir = path.join(cwd, 'node_modules', 'react-icons');
const outputDir = path.join(cwd, 'svg-icons');

const ICON_LIBRARY_MAP: Record<string, string> = {
  ai: 'Ant Design Icons',
  bi: 'Bootstrap Icons',
  bs: 'BoxIcons',
  cg: 'Circum Icons',
  ci: 'css.gg',
  di: 'Devicons',
  fa: 'Font Awesome 5',
  fa6: 'Font Awesome 6',
  fc: 'Flat Color Icons',
  fi: 'Feather',
  gi: 'Game Icons',
  go: 'Github Octicons icons',
  gr: 'Grommet-Icons',
  hi: 'Heroicons',
  hi2: 'Heroicons 2',
  im: 'IcoMoon Free',
  io: 'Ionicons 4',
  io5: 'Ionicons 5',
  lia: 'Icons8 Line Awesome',
  lu: 'Lucide',
  md: 'Material Design icons',
  pi: 'Phosphor Icons',
  ri: 'Remix Icon',
  rx: 'Radix Icons',
  si: 'Simple Icons',
  sl: 'Simple Line Icons',
  tb: 'Tabler Icons',
  tfi: 'Themify Icons',
  ti: 'Typicons',
  vsc: 'VS Code Icons',
  wi: 'Weather Icons',
};

const args = process.argv.slice(2); // exclude node, path to script

const argsIndex = args.indexOf('--args');
let icons: string[] = [];
let parsedArgs: Record<string, string> = {};

if (argsIndex !== -1) {
  icons = args.slice(0, argsIndex);
  const rawArgs = args.slice(argsIndex + 1);

  rawArgs.forEach(arg => {
    const [key, value] = arg.split('=');
    if (key && value) {
      parsedArgs[key] = value;
    }
  });
} else {
  icons = args;
}

const logVerbose = parsedArgs?.log === 'verbose' ? console.log : () => {};

add(icons, parsedArgs);

async function add(icons: string[], args: Record<string, string>): Promise<undefined> {
  if (!icons.length) {
    console.log('No icons provided');
    process.exit();
  }

  // build available icon map based on react-icons types
  // e.g.: { MdArrowLeft: ["md"], HiArrowLeft: ["hi", "hi2"] }
  const iconMap = await buildIconMap();

  const addedIcons: string[] = [];

  for (const icon of icons) {
    const iconLibs = iconMap[icon];

    // react-icons generated JSX components,
    // we use `react-dom` to render the component to an HTML string
    let IconComponent;
    let selectedLib: string;

    if (iconLibs.length === 1) {
      const { [icon]: Icon } = await import(`react-icons/${iconLibs[0]}`);
      IconComponent = Icon;
      selectedLib = iconLibs[0];
    } else {
      const defaultLib = args.lib;
      if (defaultLib && iconMap[icon].includes(defaultLib)) {
        const { [icon]: Icon } = await import(`react-icons/${defaultLib}`);
        IconComponent = Icon;
        selectedLib = defaultLib;
      } else {
        const { prompt } = await import('enquirer');
        selectedLib = await prompt({
          type: 'select',
          name: 'typeName',
          message: `Icon ${icon} is available in 2 icon libraries. Pick the library you want to use.`,
          initial: 0,
          choices: iconLibs.map(lib => ({
            value: lib,
            name: ICON_LIBRARY_MAP[lib] || lib,
          })),
        });
        const { [icon]: Icon } = await import(`react-icons/${selectedLib}`);
        IconComponent = Icon;
      }
    }

    const input = renderToString(IconComponent());

    try {
      await writeIcon(icon, input);
      addedIcons.push(icon);
    } catch (err) {
      console.log(`The icon ${icon} was not added for a reason:`);
      console.log(err);
      continue;
    }
  }

  for (const addedIcon of addedIcons) {
    logVerbose('✅', addedIcon);
  }
  logVerbose(`Saved to ${outputDir}`);

  console.log(`Was added ${addedIcons.length} icon(s) in your collection`);
  process.exit();
}

async function buildIconMap(): Promise<Record<string, string[]>> {
  const iconMap: Record<string, string[]> = {};

  const reactIconsFolders = (
    await fs.readdir(reactIconsDir, {
      withFileTypes: true,
    })
  )
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  await Promise.allSettled(
    reactIconsFolders.map(async folder => {
      const filePath = path.join(reactIconsDir, folder, 'index.d.ts');

      const fileContent = await fs.readFile(filePath, 'utf-8');

      const regex = /export\s+declare\s+const\s+([A-Za-z0-9_]+):\s+IconType;/g;

      [...fileContent.matchAll(regex)].forEach(([, match]) => {
        if (iconMap[match]) {
          iconMap[match].push(folder);
        } else {
          iconMap[match] = [folder];
        }
      });
    }),
  );

  return iconMap;
}

async function writeIcon(fileName: string, content: string): Promise<boolean> {
  const filePath = path.join(outputDir, `${fileName}.svg`);

  await fsExtra.writeFile(filePath, content);
  return true;
}
