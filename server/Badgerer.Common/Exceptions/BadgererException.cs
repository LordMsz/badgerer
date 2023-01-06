namespace Badgerer.Common.Exceptions
{
    public class BadgererException : ApplicationException
    {
        public BadgererException(string message) : base(message) { }

        public BadgererException(string? message, Exception? innerException) : base(message, innerException) { }
    }
}
