import React from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import reducer, { changeAppNameAction } from './reducer';
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
const Main = () => {
  const dispatch = useDispatch();
  const token = useSelector(({user}) => user.token);
  const [remoteAppInput, setRemoteAppInput] = useState('');

  return (
    <Wrapper style={{ marginTop: '10px' }}>
      <Title>RemoteApp</Title>
      <div>User token from portal: {token}</div>

      <div>
        <input
          style={{ marginRight: '10px' }}
          type="text"
          onChange={e => {
            setRemoteAppInput(e.target.value);
          }}
        />
        <button onClick={() => dispatch(changeAppNameAction(remoteAppInput))}>
          Dispatch RemoteApp new name
        </button>
      </div>
    </Wrapper>
  );
}
const MainWrapper = props => {
  const { store } = props;
  useEffect(() => {
    store.injectReducer('remoteApp', reducer);
  }, []);

  return (
    <Provider store={store || {}}>
      <Main />
    </Provider>
  );
};
export default MainWrapper