bool ValidateIPv4(string ipString)
{
    try
    {
        if (string.IsNullOrWhiteSpace(ipString))
        {
            return false;
        }

        string[] splitValues = ipString.Split('.');

        if (splitValues.Length != 4)
        {
            return false;
        }

        return splitValues.All(r => byte.TryParse(r, out byte tempForParsing));
    }
    catch(Exception ex)
    {
        throw ex;
    }
}


string Decrypt(string value)
{
    try
    {
        string keyString = "<YOUR_KEY>";
        string ivString = "<YOUR_IV>";

        byte[] key = Encoding.ASCII.GetBytes(keyString);
        byte[] iv = Encoding.ASCII.GetBytes(ivString);

        using (var rijndaelManaged = new RijndaelManaged { Key = key, IV = iv, Mode = CipherMode.CBC })
        {
            rijndaelManaged.BlockSize = 128;
            rijndaelManaged.KeySize = 256;

            using (var memoryStream = new MemoryStream(Convert.FromBase64String(value)))
            using (var cryptoStream = new CryptoStream(
                memoryStream,
                rijndaelManaged.CreateDecryptor(key, iv),
                CryptoStreamMode.Read
            ))
            {
                return new StreamReader(cryptoStream).ReadToEnd();
            }
        }
    }
    catch (Exception ex)
    {
        return valor;
    }
}