import { useState, useLayoutEffect } from 'react';
import { ICollection } from '../../models';

export function useCollectionState() {
  const [modal, setModal] = useState<boolean>(false);
  const [onChangeCollection, setOnChangeCollection] = useState<ICollection | undefined>();
  const [listOfCollections, setListOfCollections] = useState<ICollection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newCollectionFlag, setNewCollectionFlag] = useState<boolean>(true);

  useLayoutEffect(() => {
    setOnChangeCollection(undefined);
    setNewCollectionFlag(true);
  }, []);

  return {
    modal,
    setModal,
    onChangeCollection,
    setOnChangeCollection,
    listOfCollections,
    setListOfCollections,
    filteredCollections,
    setFilteredCollections,
    loading,
    setLoading,
    newCollectionFlag,
    setNewCollectionFlag,
  };
}