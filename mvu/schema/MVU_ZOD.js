// Native MVU registration retained. This card owns no persistent numerical variables.
// passthrough prevents stripping another existing native variable; affinity stays in tags.
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';
export const Schema = z.object({}).passthrough().prefault({});
$(() => { registerMvuSchema(Schema); });
