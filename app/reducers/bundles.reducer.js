import { bundleConstants } from '../constants/bundle.constants';

export function bundles(state = {}, action) {
  switch (action.type) {
    case bundleConstants.FETCH_REQUEST:
      return {
        loading: true
      };
    case bundleConstants.FETCH_SUCCESS:
      return {
        items: action.bundles
      };
    case bundleConstants.FETCH_FAILURE:
      return {
        error: action.error
      };
    case bundleConstants.DELETE_REQUEST:
      // add 'deleting:true' property to bundle being deleted
      return {
        ...state,
        items: state.items.map(bundle =>
          (bundle.id === action.id
            ? { ...bundle, deleting: true }
            : bundle))
      };
    case bundleConstants.TOGGLE_MODE_PAUSE_RESUME: {
      const updatedItems = forkArray(
        state.items,
        bundle => bundle.id === action.id,
        bundle => buildToggledBundle(bundle)
      );
      return {
        ...state,
        items: updatedItems
      };
    }
    case bundleConstants.TOGGLE_SELECT: {
      const selectedBundle = state.selectedBundle && state.selectedBundle.id === action.id ?
        {} : state.items.find(bundle => bundle.id === action.id);
      return {
        selectedBundle,
        items: state.items
      };
    }
    case bundleConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to bundle
      return {
        ...state,
        items: state.items.map(bundle => {
          if (bundle.id === action.id) {
            // make copy of bundle without 'deleting:true' property
            const { deleting, ...bundleCopy } = bundle;
            // return copy of bundle with 'deleteError:[error]' property
            return { ...bundleCopy, deleteError: action.error };
          }
          return bundle;
        })
      };
    default:
      return state;
  }
}

function forkArray(array, condition, createItem) {
  return array.map((item, index) => (condition(item, index) ? createItem(item) : item));
}

function buildToggledBundle(bundle) {
  const newMode = bundle.status === 'NOT_STARTED' || bundle.mode === 'PAUSED' ? 'RUNNING' : 'PAUSED';
  const newStatus = bundle.status === 'NOT_STARTED' ? `${bundle.task}ING` : bundle.status;
  const formattedProgress = formatProgress(bundle);
  const uploadingMsg = `Uploading ${formattedProgress}`;
  const downloadingMsg = `Downloading ${formattedProgress}`;
  let newStatusDisplayAs;
  if (bundle.status === 'NOT_STARTED') {
    newStatusDisplayAs = (bundle.task === 'DOWNLOAD' ? downloadingMsg : uploadingMsg);
  } else if (bundle.status === 'UPLOADING') {
    newStatusDisplayAs = (newMode === 'PAUSED' ? `Resume Uploading ${formattedProgress}` : uploadingMsg);
  } else if (bundle.status === 'DOWNLOADING') {
    newStatusDisplayAs = (newMode === 'PAUSED' ? `Resume Downloading ${formattedProgress}` : downloadingMsg);
  } else {
    newStatusDisplayAs = bundle.statusDisplayAs;
  }
  return {
    ...bundle,
    status: newStatus,
    mode: newMode,
    statusDisplayAs: newStatusDisplayAs
  };
}

function formatProgress(bundle) {
  const progress = bundle.progress ? bundle.progress : 0;
  return `(${progress}%)`;
}

export default bundles;
