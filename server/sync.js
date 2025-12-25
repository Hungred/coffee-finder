import fetch from 'node-fetch';
import db from './db.js';

// 同步咖啡廳資料從 Cafenomad API 到本地 SQLite 資料庫
async function syncCafes() {
  const res = await fetch('https://cafenomad.tw/api/v1.2/cafes');
  const cafes = await res.json();

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO cafes
    (id, name, city,wifi, seat, quiet, tasty, cheap, music, url, address, latitude, longitude, limited_time, socket, standing_desk, mrt, open_time)
    VALUES (@id, @name, @city, @wifi, @seat, @quiet, @tasty, @cheap, @music, @url, @address, @latitude, @longitude, @limited_time, @socket, @standing_desk, @mrt, @open_time)
  `);

  cafes.forEach((cafe) => {
    stmt.run({
      id: cafe.id,
      name: cafe.name,
      city: cafe.city,
      wifi: cafe.wifi,
      seat: cafe.seat,
      quiet: cafe.quiet,
      tasty: cafe.tasty,
      cheap: cafe.cheap,
      music: cafe.music,
      url: cafe.url,
      address: cafe.address || '',
      latitude: cafe.latitude,
      longitude: cafe.longitude,
      limited_time: cafe.limited_time || '',
      socket: cafe.socket || '',
      standing_desk: cafe.standing_desk || '',
      mrt: cafe.mrt || '',
      open_time: cafe.open_time || '',
    });
  });

  console.log('Sync done, total cafes:', cafes.length);
}

syncCafes();
