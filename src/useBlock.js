import { useEffect, useState } from "react";

import "./App.css"; 

export const useBlock = (alchemy) => {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [transactionsBlock, setTransactionsBlock] = useState();
  const [error, setError] = useState();
  const [firstTransaction, setFirstTransaction] = useState();
  const [transactionReceipt, setTransactionReceipt] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        const block = await alchemy.core.getBlock(blockNumber);
        const transactionsBlock = await alchemy.core.getBlockWithTransactions();
        const firstTransaction = transactionsBlock.transactions[0];
        const transactionReceipt = await alchemy.core.getTransactionReceipt(
          firstTransaction.hash
        );

        setBlockNumber(blockNumber);
        setBlock(block);
        setTransactionsBlock(transactionsBlock);
        setFirstTransaction(firstTransaction);
        setTransactionReceipt(transactionReceipt);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [alchemy]);

  return {
    blockNumber,
    block,
    transactionsBlock,
    firstTransaction,
    transactionReceipt,
    error,
  };
};