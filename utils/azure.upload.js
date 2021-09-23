const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
  ContainerClient,
} = require("@azure/storage-blob");

const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);

const pipeline = newPipeline(sharedKeyCredential);

exports.blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

exports.containerClientExist = async (name) => {
  const newContainer = new ContainerClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${name}`,
    pipeline
  );
  return await newContainer.exists();
};

exports.createContainerIfNotExist = async (name) => {
  const newContainer = new ContainerClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${name}`,
    pipeline
  );
  return await newContainer.createIfNotExists();
};

exports.deleteContainerIfExist = async (name) => {
  const newContainer = new ContainerClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${name}`,
    pipeline
  );
  return await newContainer.deleteIfExists();
};

exports.getBlobName = (originalName) => {
  // Use a random number to generate a unique file name,
  // removing "0." from the start of the string.
  const identifier = Math.random().toString().replace(/0\./, "");
  return `${identifier}-${originalName}`;
};
