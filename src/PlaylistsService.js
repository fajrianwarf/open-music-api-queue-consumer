const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const queryPlaylists = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const playlists = await this._pool.query(queryPlaylists);

    const queryPlaylistSongIds = {
      text: 'SELECT song_id FROM playlist_songs WHERE playlist_id = $1',
      values: [playlistId],
    };
    const { rows: songIds } = await this._pool.query(queryPlaylistSongIds);

    const playlistSongs = await Promise.all(
      Object.values(songIds).map(async (song) => {
        const querySongs = {
          text: 'SELECT id, title, performer FROM songs WHERE id = $1',
          values: [song.song_id],
        };
        const songs = await this._pool.query(querySongs);
        return {
          id: songs.rows[0].id,
          title: songs.rows[0].title,
          performer: songs.rows[0].performer,
        };
      }),
    );

    return {
      playlist: {
        id: playlists?.rows?.[0]?.id,
        name: playlists?.rows?.[0]?.name,
        songs: playlistSongs,
      },
    };
  }
}

module.exports = PlaylistsService;
