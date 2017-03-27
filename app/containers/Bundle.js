// @flow
import { Component } from 'react';
import type { Children } from 'react';

type Props = {children: Children, load: () => Promise<*>};
class Bundle extends Component {

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  props: Props

  load(props: Props) {
    this.setState({
      mod: null
    });
    props.load().then(mod => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
      return mod;
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return this.props.children(this.state.mod);
  }
}

export default Bundle;
