import { FolderPath } from '../domain/folder-path';
import { ChokidarFolderWatcher } from './chokidar-folder-watcher';
import { LocalEventBus } from './local-event-bus';
import * as fs from 'fs';

describe('Infrastructure ---> Chokidar Implementation', () => {
  const fileTestOne = `${__dirname}/testOne`;
  const fileTestTwo = `${__dirname}/testTwo`;
  const folderTestOne = `${__dirname}/folder`;

  afterEach(async () => {
    try {
      fs.unlinkSync(fileTestOne);
      fs.rmdirSync(folderTestOne);
    } catch (error) {}
  });

  it('should catch the add event ', (done) => {
    LocalEventBus.getInstance().register('monitor', async (data: any) => {
      if (data) {
        expect(data).toHaveProperty('event');
      }
      done();
    });

    const watcher = new ChokidarFolderWatcher();
    watcher.monitor(new FolderPath(__dirname));

    setTimeout(function () {
      fs.writeFileSync(fileTestOne, 'Hey there One!');
    }, 1500);
  });

  it('should catch the unlink event ', (done) => {
    LocalEventBus.getInstance().register('monitor', async (data: any) => {
      if (data) {
        expect(data).toHaveProperty('event');
      }
      done();
    });

    const watcher = new ChokidarFolderWatcher();
    watcher.monitor(new FolderPath(__dirname));

    setTimeout(function () {
      fs.writeFileSync(fileTestTwo, 'Hey there Two!');
      fs.unlinkSync(fileTestTwo);
    }, 1500);
  });

  it('should catch the addDir event ', (done) => {
    LocalEventBus.getInstance().register('monitor', async (data: any) => {
      if (data) {
        expect(data).toHaveProperty('event');
      }
      done();
    });

    const watcher = new ChokidarFolderWatcher();
    watcher.monitor(new FolderPath(__dirname));

    setTimeout(function () {
      fs.mkdirSync(folderTestOne);
    }, 1500);
  });
});
