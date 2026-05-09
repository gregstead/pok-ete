import React from "react";

class GamePrompt extends React.Component {
  render() {
    const { text, visible, promptOptions } = this.props;
    if (!visible) return null; // don't render anything if the prompt isn't visible

    return (
      <div className="game-prompt-container">
        {promptOptions && (
          <div className="prompt-options-container">
            <div className="prompt-options-modal">
              <form>
                {promptOptions.map((option, index) => (
                  <div className="radio-option">
                    <input
                      type="radio"
                      key={index}
                      id={`option-${index}`}
                      name="prompt-option"
                      value={option}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        )}
        {text && (
          <div className="game-prompt-message-container">
            <div className="game-prompt-message">
              <p>{text}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GamePrompt;
