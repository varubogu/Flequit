# Data synchronization flowchart

## Synchronization flow for Local Files and Cloud Storage

The following data will be used for synchronization.

- Local files
- Local-to-cloud differential information file (stored in local temporary space)
- Cloud-to-local differential information file (stored in local temporary space)
- Cloud files

### Data Synchronization During Save/Upload

1. Save the "local file".
2. Save only the differences to the "local-to-cloud differential information file".
3. Compare the last updated timestamp of the "cloud file" with the last synchronized timestamp of the "local file".
   1. If the last updated timestamp of the "cloud file" is newer than the last synchronized timestamp of the "local file", save the data from the "cloud file" after the last synchronized timestamp to the "cloud-to-local differential information file".
   2. If there is a conflict between the local-to-cloud differences and the cloud-to-local differences, prompt the user to resolve the conflict.
   3. If no conflict occurs or the conflict is resolved, continue processing.
   4. Save the "cloud-to-local differential information file" to the "local file".
4. Reflect the "local-to-cloud differential information file" in the "cloud file".
5. Update the last updated timestamp of the "cloud file".
6. Update the last synchronized timestamp of the "local file".

### Periodic Data Synchronization

1. Compare the last updated timestamp of the "cloud file" with the last synchronized timestamp of the "local file".
   1. If they are the same, skip the subsequent processing.
2. Save the data from the "cloud file" after the last synchronized timestamp to the "cloud-to-local differential information file".
3. Save the data from the "local file" after the last synchronized timestamp to the "local-to-cloud differential information file".
4. If there is a conflict between the local-to-cloud differences and the cloud-to-local differences, prompt the user to resolve the conflict.
5. If no conflict occurs or the conflict is resolved, continue processing.
6. Save the "cloud-to-local differential information file" to the "local file".
7. Reflect the "local-to-cloud differential information file" in the "cloud file".
8. Update the last updated timestamp of the "cloud file".
9. Update the last synchronized timestamp of the "local file".
