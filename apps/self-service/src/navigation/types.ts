export type RootStackParamList = {
  Tabs: undefined;
  DeleteApiKey: { id: string; name: string };
};

export type TabParamList = {
  Login: undefined;
  ApiKeys: undefined;
  ApiKeyEditor: { id?: string } | undefined;
  Usage: undefined;
};
