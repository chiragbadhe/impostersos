import React from 'react';
import Header from '../components/Header';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b text-white">
      <Header />
      <div className="max-w-3xl mx-auto border border-white/25 p-10 shadow-2xl bg-black/30 backdrop-blur-md my-16 rounded-lg">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Welcome to ImposterSOS MVP!
          </h1>
          <p className="text-xl leading-relaxed mb-6">
            Dive into the world of "Guess the Imposter," a Web3 game where strategy and deception meet blockchain technology. Create or join a room, and engage in an interactive experience with voice chat and image analysis.
          </p>
          <p className="text-xl leading-relaxed mb-6">
            As a player, you will deposit funds to join a room. Once the room is full, the game begins with a display of images. One player will receive an altered image, marking them as the imposter. Your task is to identify the imposter before time runs out.
          </p>
          <p className="text-xl leading-relaxed mb-6">
            Use the integrated voice chat to discuss and strategize with other players. Submit your guess on-chain, and if you correctly identify the imposter, you'll receive a reward distributed via smart contracts.
          </p>
          <p className="text-xl leading-relaxed">
            Join us in this exciting MVP phase and help shape the future of ImposterSOS. Your feedback is crucial as we enhance the game with more features and rewards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
