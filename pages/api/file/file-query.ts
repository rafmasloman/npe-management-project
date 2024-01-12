class DownloadFileAPI {
  private static routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/files/download`;
  static async downloadImageFile(foldername: string, filename: string) {
    try {
      const response = await fetch(
        `${this.routesName}/${foldername}/${filename}`,
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default DownloadFileAPI;
