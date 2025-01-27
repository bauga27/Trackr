import os
from flask import Flask, redirect, request, session, render_template
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Load environment variables
load_dotenv()

# Initialize Flask
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Initialize Spotify OAuth
sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIFY_REDIRECT_URI"),
    scope="user-read-private user-read-playback-state streaming"
)

# store artists and albums (repalce with mongo db)
trackr_saved_data = {
    'artists': [], 
    'albums': []
}

@app.route('/')
def home():
    # Check if the user is already logged in
    if not session.get("token_info"):
        return render_template("home.html")
    
    # If logged in, obtain user data
    token_info = session.get("token_info")
    sp = spotipy.Spotify(auth=token_info['access_token'])
    user = sp.current_user()

    # Use trackr_saved_data instead of querying Spotify's top artists and albums
    saved_artists = trackr_saved_data['artists']  # Use the saved artists data from your local storage
    saved_albums = trackr_saved_data['albums']  # Use the saved albums data from your local storage

    return render_template("main.html", user_name=user['display_name'], saved_artists=saved_artists, saved_albums=saved_albums)



@app.route('/login')
def login():
    # Redirect to the Spotify login page
    return redirect(sp_oauth.get_authorize_url())

@app.route('/callback')
def callback():
    token_info = sp_oauth.get_access_token(request.args['code'])  # Get access token from code
    session['token_info'] = token_info  # Save token info to session
    return redirect('/')  # Redirect back to home after authentication

@app.route('/logout')
def logout():
    session.clear()  # Clear session to log out
    return redirect('/')  # Redirect back to home

if __name__ == "__main__":
    app.run(debug=True)
