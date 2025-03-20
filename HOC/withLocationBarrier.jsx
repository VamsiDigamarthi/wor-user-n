import LocationBarrierModal from "./LocationBarrierModal";

export const withLocationBarrierHoc = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <WrappedComponent {...props} />
        <LocationBarrierModal />
      </>
    );
  };
};
