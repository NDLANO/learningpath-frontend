import { createErrorPayload } from '../../sources/helpers';

export default function payload403invalid () {
    return createErrorPayload(403, 'Invalid', {message: 'Invalid'});
}
