import axios from "axios";
import _ from "lodash";
import React, {
  FC, ReactElement, useContext, useEffect
} from "react";
import {
  Container, Heading, Image
} from "react-bulma-components";
import FlightsLogo from "../assets/flights-logo.png";
import { City, MCFSetStateContext } from "../contexts/MCFFlightsProvider";
const ProductNameLogo: FC = (): ReactElement => {
  const {
    getMCFCities,
    setLoadingCities,
    setHasCitiesError,
    setCityOptionList
  } = useContext(MCFSetStateContext);
  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoadingCities(true);
    getMCFCities({
      cancelToken: source.token
    }).then((res) => {
      setCityOptionList(_.get(res, ["data", "data", "result"], []).map((city: City) => ({
        value: city.code,
        displayName: `${city.name}, ${city.country}`
      })));
      setLoadingCities(false);
    })
      .catch((e) => {
        if (!axios.isCancel(e)) {
          setHasCitiesError(true);
        }
      });
    return () => {
      source.cancel();
    };
  }, [
    getMCFCities,
    setLoadingCities,
    setHasCitiesError,
    setCityOptionList
  ]);
  return (
    <Container display="flex" marginless style={{ padding: "2.5rem" }}>
      <Image src={FlightsLogo} alt="flights-logo" size={64} />
      <Heading size={1} style={{ paddingLeft: "1rem" }}>
        Flights
      </Heading>
    </Container>
  );
};
export default ProductNameLogo;
