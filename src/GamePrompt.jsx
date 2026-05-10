import React from "react";
import { handleFormFocus, handleKeyDown } from "./userInteractions.js";

class GamePrompt extends React.Component {
  promptRef = React.createRef();

  componentDidMount() {
    // TODO next: this component now receives gamePrompt as a prop, so visibility checks
    // should read from gamePrompt.visible if this lifecycle focus approach stays.
    if (this.props.visible) {
      this.promptRef.current?.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      // TODO next: this currently focuses the prompt shell. For option prompts,
      // consider focusing the first radio input so native keyboard traversal works.
      this.promptRef.current?.focus();
    }
  }

  render() {
    const { gamePrompt, setGamePrompt } = this.props;
    if (!gamePrompt.visible) return null; // don't render anything if the prompt isn't visible

    return (
      <div className="game-prompt-container" ref={this.promptRef} tabIndex={-1}>
        {gamePrompt.promptOptions && (
          <div className="game-prompt-options-container">
            <div className="game-prompt-options-modal">
              {/* TODO next: let this form submit/confirm the current userResponse,
                  while each radio's onChange only updates the selected value. */}
              <form>
                {gamePrompt.promptOptions.map((option, index) => (
                  <div
                    className="game-prompt-radio-option"
                    key={`option-${index}-key`}
                  >
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="prompt-option"
                      value={option.value}
                      // TODO next: make this a controlled input with checked tied to
                      // gamePrompt.userResponse, then update that state in onChange.
                      onFocus={(event) => {
                        handleFormFocus(event, { gamePrompt, setGamePrompt });
                      }}
                    />
                    <label htmlFor={`option-${index}`}>{option.text}</label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        )}
        {gamePrompt.text && (
          <div className="game-prompt-text-container">
            <div className="game-prompt-text-modal">
              <div className="game-prompt-text">
                <p>{gamePrompt.text}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GamePrompt;
