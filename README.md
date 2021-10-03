# mais-hacks-2021

## Inspiration
- Our team was inspired by the many board games that we've enjoyed playing together. Most of the time we usually end up breaking the rules of the games we're playing and it gets chaotic so our goal was to create randomly generated chaotic games based off of user input so that people like us could get a good laugh out of it. We were curious if an AI would be able to generate its own custom games, so we put our curiosity to work.

## What Does It Do?
- Our Web Application makes a fetch request to a Python Web API to access a GPT-2 trained model to generate board game rules based on a dataset of many board game rule books. It also is able to connect users to the same board game given a room code, this however was implemented on the server-side using Express and Socket.io.

## How It Was Built?
Front-End
- React.js
- Material-UI

Back-End
- Express.js
- Socket.io

Dataset was scraped from many publicly available board game rules.

AI was trained through GPT-2 (By OpenAi) and was implemented through the Tesnorflow library in Python.

## Challenges We Encountered?
- We were mostly chjallenge with making the web application work with multiple users connceted to the same game/socket. In the end we managed to configure the sockets effectively, however we didn't have enough time to implement the features (chat-room, connected users, board to play on) we wanted to use with it since we were constrained by a 24h time limit.

## Accomplishments That We're Proud Of
- We are content that we were able to efficiently create a model and train it so that it could properly generate legible game rules that can actually be played to a certain extent.

## What We Learned?

AI
- We got to learn more about GPT-2 and learnt how to generate and train a model.

Web Application
- We got to learn more about Socket programming along with the events that come with it. 
- We had the opportunity to practice developing a meaningful Full-Stack application.

What's Next?
- Since we got a little trumped by our time constraint, we weren't able to finish our chat-room feature that we felt was crucial to the integrity of the game. We plan on continuing to work on this project after the hackathon so that we can improve both the model and the code efficiency. With more time, we believe that we will be able to make a fully-functional board game platform for people to use with their friends to decompress and have a good time.

## Built With
- GPT-2
- Tensorflow
- JavaScript
  - React.js
  - Express.js
  - Socket.Io
  - Material-UI
- Python
  - FastApi
