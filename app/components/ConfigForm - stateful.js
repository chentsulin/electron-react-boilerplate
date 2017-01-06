import React from 'react';
import { TextInput, Text, View, Radio, Label } from 'react-desktop/windows';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("New props is", nextProps);
    // if (nextProps.hostName !== )
    return true;
  }

  render() {
    // let hostName = this.props.hostName;
    // let ftpPort = this.props.ftpPort;
    // let ftpUserName = this.props.ftpUserName;
    // let ftpPassword = this.props.ftpPassword;
    // const setHostName = this.props.setHostName;
    // const setFtpPort = this.props.setFtpPort;
    // const setFtpUserName = this.props.setFtpUserName;
    // const setFtpPassword = this.props.setFtpPassword;
    const color = this.props.color;
    const theme = this.props.theme;
    // const setThemeDark = this.props.setThemeDark;
    // const setThemeLight = this.props.setThemeLight;
    return (
      <View
        color={color}
        theme={theme}
        layout='vertical'
        horizontalAlignment='center'
        width='100%'
        height='100%'
        >
        <Label color={theme === 'dark' ? 'white' : '#333'}>Hostname or IP</Label>
        <TextInput
          theme={theme}
          placeholder="192.168.0.1"
          // onChange={(evt) => setHostName(evt.target.value)}
          // value={this.props.hostName}
          />
        <Label color={theme === 'dark' ? 'white' : '#333'}>FTP Port</Label>
        <TextInput
          // onChange={(evt) => setFtpPort(evt.target.value)}
          // value={ftpPort}
          />
        <Label color={theme === 'dark' ? 'white' : '#333'}>FTP User Name</Label>
        <TextInput
          placeholder="Gene.Amdahl"
          // onChange={(evt) => setFtpUserName(evt.target.value)}
          // value={ftpUserName}
          />
        <Label color={theme === 'dark' ? 'white' : '#333'}>FTP Password</Label>
        <TextInput
          placeholder="Password"
          type='password'
          // value={ftpPassword}
          // onChange={(evt) => setFtpPassword(evt.target.value)}
          />
        <Label color={theme === 'dark' ? 'white' : '#333'}>Theme</Label>
        <View layout="horizontal" theme={theme}>
          <Radio
            theme={theme}
            color={color}
            label="Dark"
            name="radio0"
            onChange={(evt) => setThemeDark()}
            defaultChecked={theme === 'dark' ? true : false}
            />
          <span
            style={{ marginLeft: '5px' }}
            />
          <Radio
            theme={theme}
            color={color}
            label="Light"
            name="radio0"
            onChange={(evt) => setThemeLight()}
            defaultValue="Light was checked!"
            defaultChecked={theme === 'light' ? true : false}
            />
        </View>
      </View>
    );
  }
}