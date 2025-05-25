import os
from flask import Flask, redirect, request, session, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Load environment variables
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Initialize Spotify OAuth
sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIFY_REDIRECT_URI"),
    scope="user-read-private user-read-playback-state streaming"
)

# store artists and albums (replace with mongo db)
trackr_saved_data = {
    'artists': [], 
    'albums': []
}

@app.route('/')
def home():
    if not session.get("token_info"):
        return redirect("http://localhost:3000")
    return redirect("http://localhost:3000/main")

@app.route('/main')
def main():
    # Check if the user is logged in
    if not session.get("token_info"):
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        token_info = session.get("token_info")
        sp = spotipy.Spotify(auth=token_info['access_token'])
        user = sp.current_user()

        # Use trackr_saved_data or fetch from database
        saved_artists = trackr_saved_data['artists']
        saved_albums = trackr_saved_data['albums']

        return jsonify({
            'userName': user['display_name'],
            'savedArtists': saved_artists,
            'savedAlbums': saved_albums
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login')
def login():
    return redirect(sp_oauth.get_authorize_url())

@app.route('/callback')
def callback():
    try:
        token_info = sp_oauth.get_access_token(request.args['code'])
        session['token_info'] = token_info
        return redirect('http://localhost:3000/main')  # Redirect to React main page
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/logout')
def logout():
    session.clear()
    return redirect('http://localhost:3000')

if __name__ == "__main__":
    app.run(debug=True)