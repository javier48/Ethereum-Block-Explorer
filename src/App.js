import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";
import { useBlock } from "./useBlock.js";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

const BlockDetails = ({ block }) => (
  <div>
    <div>
      <strong>Block Details:</strong>
    </div>
    {block && (
      <div>
        <strong>Hash:</strong> {block.hash}
        <div>
          <strong>Parent Hash:</strong> {block.parentHash}
        </div>
        <div>
          <strong>Number:</strong> {block.number}
        </div>
        <div>
          <strong>Timestamp:</strong>{" "}
          {new Date(block.timestamp * 1000).toLocaleString()}
        </div>
        <div>
          <strong>Nonce:</strong> {block.nonce}
        </div>
        <div>
          <strong>Difficulty:</strong> {block.difficulty}
        </div>
        <div>
          <strong>Gas Limit:</strong> {block.gasLimit.toString()}
        </div>
        <strong>Gas Used:</strong> {block.gasUsed.toString()}
        <div>
          <strong>Miner:</strong> {block.miner}
        </div>
        <strong>Transactions:</strong> {block.transactions.length}
      </div>
    )}
  </div>
);

const TransactionsBlock = ({ transactionsBlock }) => (
  <div>
    {transactionsBlock && (
      <div>
        <div>
          <strong>Transactions Details:</strong>
        </div>
        <strong>Hash:</strong> {transactionsBlock.hash}
        <div>
          <strong>Parent Hash:</strong> {transactionsBlock.parentHash}
        </div>
        <div>
          <strong>First transaction:</strong>{" "}
          <div>
            <strong>To:</strong> {transactionsBlock.transactions[0].to}
          </div>
          <div>
            <strong>From:</strong> {transactionsBlock.transactions[0].from}
          </div>
        </div>
      </div>
    )}
  </div>
);

const FirstTransaction = ({ firstTransaction }) => (
  <div>
    {firstTransaction && (
      <div>
        <div>
          <strong>First Transaction Details:</strong>
        </div>
        <div>
          <strong>To:</strong> {firstTransaction.to}
        </div>
        <div>
          <strong>From:</strong> {firstTransaction.from}
        </div>
        <div>
          <strong>Value:</strong> {firstTransaction.value.toString()}
        </div>
        <div>
          <strong>Data:</strong> {firstTransaction.data}
        </div>
      </div>
    )}
  </div>
);

const TransactionReceipt = ({ transactionReceipt }) => (
  <div>
    {transactionReceipt && (
      <div>
        <div>
          <strong>Transaction Receipt:</strong>
        </div>
        <div>
          <strong>Contract Address:</strong>{" "}
          {transactionReceipt.contractAddress}
        </div>
        <div>
          <strong>Transaction Index:</strong>{" "}
          {transactionReceipt.transactionIndex}
        </div>
        <div>
          <strong>Gas Used:</strong> {transactionReceipt.gasUsed.toString()}
        </div>
        <div>
          <strong>Type:</strong> {transactionReceipt.type.toString()}
        </div>
      </div>
    )}
  </div>
);

function App() {
  const {
    blockNumber,
    block,
    transactionsBlock,
    firstTransaction,
    transactionReceipt,
    error,
  } = useBlock(alchemy);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <div>
        <strong>Block Number:</strong> {blockNumber}
      </div>
      <BlockDetails block={block}></BlockDetails>
      <TransactionsBlock
        transactionsBlock={transactionsBlock}
      ></TransactionsBlock>
      <FirstTransaction firstTransaction={firstTransaction} />
      <TransactionReceipt transactionReceipt={transactionReceipt} />
    </div>
  );
}

export default App;