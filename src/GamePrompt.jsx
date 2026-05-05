import React from "react";

class GamePrompt extends React.Component {
  render() {
    const { text, visible, promptOptions } = this.props;
    if (!visible) return null; // don't render anything if the prompt isn't visible

    return (
      <div className="game-prompt">
        <p>{text}</p>
        {promptOptions && (
          <div className="prompt-options">
            {promptOptions.map((option, index) => (
              <button key={index}>{option}</button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default GamePrompt;
