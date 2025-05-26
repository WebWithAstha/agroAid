import {useDispatch, useSelector } from 'react-redux';

import Header from '../partials/Header';
import QueryList from '../assistant/QueryList';
import QueryInput from '../assistant/QueryInput';
import { loadUserQueries, sendUserQuery } from '../../store/storeActions/queryAction';
import { useEffect } from 'react';

const Assistant = () => {
  const dispatch = useDispatch();
  const { queries, botTyping } = useSelector(state => state.queryReducer);

  useEffect(() => {
    // Only dispatch if queries list is empty
    if (!queries) {
      // console.log("no queries found about to dispatch action")
      dispatch(loadUserQueries());
    }
  }, [dispatch]);

  const handleSendQuery = (text, isVoice) => {
    dispatch(sendUserQuery(text, isVoice));
  };
  
    return (
        <div className="flex flex-col h-screen bg-gray-50">
        <Header title="Farming Assistant" />
        <QueryList 
          queries={queries} 
          botTyping={botTyping}
        />
        <QueryInput
          handleSendQuery={handleSendQuery}
        />
      </div>
    );
  }

export default Assistant