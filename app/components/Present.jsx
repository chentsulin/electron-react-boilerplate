// @flow
import React, { Component } from 'react';
import styles from './Present.css';
import NavBar from '../containers/NavBar';
import UPRKit from '../UPRKit';
import Display from '../images/display.svg';
import Check from '../images/check.svg';

type Props = {
  token: string,
  holdFor: string,
  actions: {
    tokenActions: {
      resetToken: () => void
    },
    holdForActions: {
      clearHoldFor: () => void
    }
  }
};

export default class Home extends Component<Props> {
  props: Props;

  componentDidMount() {
    const {
      props: { token, holdFor }
    } = this;
    UPRKit.Utils.listenForEvents(token, holdFor);
  }

  componentWillUnmount() {
    const {
      props: {
        actions: { holdForActions, tokenActions }
      }
    } = this;
    holdForActions.clearHoldFor();
    tokenActions.resetToken();
    UPRKit.Utils.disconnect();
  }

  render() {
    return (
      <div>
        <NavBar title="Present" />
        <div className={styles.container} data-tid="container">
          <h2>Ready to Go</h2>
          <h3>Open your presentation and use the app as a remote</h3>
          <div className={styles.statusContainer}>
            <div className={styles.slide}>
              <div>
                <img src={Check} alt="computer" />
              </div>
            </div>
            <img src={Display} alt="computer" />
          </div>
        </div>
      </div>
    );
  }
}
