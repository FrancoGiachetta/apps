import type {
  FunctionEventContext,
  FunctionEventHandler,
  FunctionTypeEnum,
  AppActionRequest,
} from '@contentful/node-apps-toolkit';
import { BASE_URL } from './helpers/constants';

type HandleFormsParameters = {
  token: string;
  workspaceId: string;
};

export const handler: FunctionEventHandler<FunctionTypeEnum.AppActionCall> = async (
  event: AppActionRequest<'Custom', HandleFormsParameters>,
  _context: FunctionEventContext
) => {
  const { token, workspaceId } = event.body;

  const response = await fetch(`${BASE_URL}/forms?page_size=200&workspace_id=${workspaceId}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw new Error(`Non-200 (${response.status}) response for GET Request`);
  }

  return { forms: await response.json() };
};
