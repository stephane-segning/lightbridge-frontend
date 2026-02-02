export type RootStackParamList = {
  Help: undefined;
  Login: undefined;
  Tabs: undefined;
  DeleteApiKey: { id: string; name: string };
};

export type TabParamList = {
  ApiKeys: undefined;
  ApiKeyEditor: { id?: string } | undefined;
  Usage: undefined;
};
